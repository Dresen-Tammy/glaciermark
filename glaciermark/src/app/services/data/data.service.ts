import { Message } from './../../models/message';
import { ServerProject } from '../../models/server-project';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subscription, of } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Project } from '../../models/project';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  public readonly allProjects$: Observable<Array<Project>>;

  private _projectBS: BehaviorSubject<Array<Project>>;
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
    this._projectBS = new BehaviorSubject<Array<Project>>([this._defaultProject]);
    this.allProjects$ = this._projectBS.asObservable();
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
    const projectsArray: Array<Project> = [];
    const projects: Observable<Array<Project>> = this.http.get<Array<Project>>(this.baseurl + '/projects').pipe(
      retry(1),
      catchError(this.errorHandl),
      tap((project: any) => {
        const projectsData: Project[] = [];
        project.map((item: ServerProject) => {
          projectsData.push(item.data);
        });
        this._projectBS.next(projectsData);
      })
    );
    this.allProjects$.subscribe();
    return projects;
  }

  public createMessage(value: Message): Observable<Message> {
    console.log('in createMessage');
    return this.http.post<Message>(this.baseurl + '/contact', value, this.httpOptions)
    .pipe(
      catchError(this.errorHandl)
    );
  }

  private errorHandl(error): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
