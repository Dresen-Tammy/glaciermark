import { Message } from './../../models/message';
import { ServerProject } from '../../models/server-project';
import { Injectable, OnDestroy, PLATFORM_INITIALIZER } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subscription, of } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Project } from '../../models/project';
import { SaveAs } from 'file-saver';

export interface Msg {
  msg: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  public readonly allProjects$: Observable<Array<Project>>;
  public readonly portfolio$: Observable<Array<Project>>;

  private _projectsBS: BehaviorSubject<Array<Project>>;
  private _portfolioBS: BehaviorSubject<Array<Project>>;
  private _defaultProject: Project;
  private _subscriptions: Subscription[] = [];

  private baseurl = 'https://us-central1-glaciermark.cloudfunctions.net/webApi/api/v1';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this._defaultProject = new Project();
    this._defaultProject.projectId = '-1';
    this._defaultProject.projectClass = 'default';
    this._defaultProject.projectType = 'default';
    this._defaultProject.projectText = 'loading';
    this._defaultProject.customerName = 'Please Wait';
    this._defaultProject.src = 'default-project';
    this._projectsBS = new BehaviorSubject<Array<Project>>([this._defaultProject]);
    this._portfolioBS = new BehaviorSubject<Array<Project>>([this._defaultProject]);
    this.allProjects$ = this._projectsBS.asObservable();
    this.portfolio$ = this._portfolioBS.asObservable();
  }
  public initialize(): Observable<object> {
    return this.getProjects().pipe(
      map(() => {
        return {};
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public getProject(): Observable<Project> {
    return this.http.get<Project>(this.baseurl + '/projects')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  public getProjects(): Observable<Project[]> {
    console.log('getting projects');
    const projects: Observable<Array<Project>> = this.http.get<Array<Project>>(this.baseurl + '/projects').pipe(
      retry(1),
      tap((project: any) => {
        const projectsData: Project[] = [];
        const projectsArray: Project[] = [];
        project.map((item: ServerProject) => {
          projectsData.push(item.data);
          if (item.data.portfolio) {
            projectsArray.push(item.data);
          }
        });
        this._projectsBS.next(projectsData);
        this._portfolioBS.next(projectsArray);
        // this.getRoutes();
      })
    );
    this.allProjects$.subscribe();
    return projects;
  }

  public createMessage(value: Message): Observable<HttpResponse<Msg>> {
    console.log('in createMessage');
    return this.http.post<Msg>(this.baseurl + '/contact', value, {observe: 'response'})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  public getRoutes(): void {
    const projects: Array<Project> = this._projectsBS.getValue();
    console.log(projects);
    let routes = ``;
    if (projects.length > 1) {
      console.log('in if');
      projects.forEach((project) => {
        routes += `/project/${project.customerId}-${project.projectId}\n`;
      });
      console.log(routes);
      const file = new File([routes], '../../../../Routes.txt', {type: 'text/plain;charset=utf-8'});
      SaveAs(file);
    }

  }

  private errorHandl(error): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      window.alert('There was an error. Please try again.');
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
