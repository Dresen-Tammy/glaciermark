import { SeoService } from './../seo/seo.service';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { retry, tap, map, takeUntil, catchError } from 'rxjs/operators';
import { Project } from '../../models/project';
import { Customer } from '../../models/customer';
import { ServerCustomer } from 'src/app/models/server-customer';
import { Location } from '@angular/common';

export interface Msg {
  msg: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  public readonly allCustomers$: Observable<Array<Customer>>;
  public readonly currentCustomer$: Observable<Customer>;
  public readonly currentProject$: Observable<Project>;
  public readonly portfolio$: Observable<Array<Project>>;


  private _currentCustomerId: string = 'loading';
  private _currentProjectId: string = 'loading';
  private _currentProjectIndex: number = 0;
  private _currentCustomerIndex: number = 0;
  private _defaultProject: Project;
  private _defaultCustomer: Customer;
  private _allCustomersBS: BehaviorSubject<Array<Customer>>;
  private _currentCustomerBS: BehaviorSubject<Customer>;
  private _currentProjectBS: BehaviorSubject<Project>;
  private _portfolioBS: BehaviorSubject<Array<Project>>;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  private baseurl = 'https://us-central1-glaciermark.cloudfunctions.net/webApi/api/v1';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private seoData = {
    title: 'Glacier Marketing Company - Idaho Falls - Customer: ' + this._currentCustomerId,
    description: 'Check out our portfolio of print design, digital &amp; website design,'
    + ' marketing or branding services. We have the experience to help your business with any'
    + ' nmarketing needs - all in one team! No need to parsel out your business marketing when'
    + ' you can get the Glacier Marketing services from one company. Call today 208-557-9114.',
    url: 'https://glaciermark.com/project?customer=' + this._currentCustomerId + '&project=' + this._currentProjectId
  };

  constructor(
    private http: HttpClient,
    private seo: SeoService,
    private location: Location
    ) {
    this._defaultProject = new Project();
    this._defaultProject.projectId = '-1';
    this._defaultProject.projectClass = 'default';
    this._defaultProject.projectType = 'default';
    this._defaultProject.projectText = 'loading';
    this._defaultProject.customerName = 'Please Wait';
    this._defaultProject.src = 'default-project';
    this._defaultCustomer = new Customer();
    this._defaultCustomer.customerId = 'loading';
    this._defaultCustomer.customerName = 'Loading';
    this._defaultCustomer.customerSummary = '';
    this._defaultCustomer.projects = [this._defaultProject];

    this._allCustomersBS = new BehaviorSubject<Array<Customer>>([this._defaultCustomer]);
    this._currentCustomerBS = new BehaviorSubject(this._defaultCustomer);
    this._currentProjectBS = new BehaviorSubject(this._defaultProject);
    this._portfolioBS = new BehaviorSubject<Array<Project>>([this._defaultProject]);
    this.allCustomers$ = this._allCustomersBS.asObservable();
    this.currentCustomer$ = this._currentCustomerBS.asObservable();
    this.currentProject$ = this._currentProjectBS.asObservable();
    this.portfolio$ = this._portfolioBS.asObservable();
  }

  public initialize(): Observable<object> {
    return this.getClients().pipe(
      map(() => {
        return {};
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public getClients(): Observable<Customer[]> {
    const clients: Observable<Array<Customer>> = this.http.get<Array<Customer>>(this.baseurl + '/clients').pipe(
      retry(1),
      catchError(this.errorHandler),
      tap((client: any) => {
        const clientsData: Customer[] = [];
        const projectsArray: Project[] = [];
        client.map((item: ServerCustomer) => {
          item.data.projects.map((project: Project) => {
            if (project.portfolio) {
              projectsArray[project.portfolio - 1] = project
            }
          });
          if (item.data.customerId === 'logos') {
            item.data.projects.shift();
          }
          clientsData.push(item.data);
        });
        this._allCustomersBS.next(clientsData);
        this._portfolioBS.next(projectsArray);
      },
      takeUntil(this.destroy$)
      )
      );
    return clients;
  }

  public setCustomerProjects(customerId: string): void {
    this._currentCustomerId = customerId;
    this.allCustomers$.subscribe((clients: Array<Customer>) => {
      clients.forEach((client: Customer, index: number) => {
        if (client.customerId === this._currentCustomerId) {
          this._currentCustomerBS.next(client);
        }
      });
      takeUntil(this.destroy$);
    });
  }

  public setCurrentProject(projectId: string = 'first'): void {
    const projects = this._currentCustomerBS.getValue().projects;
    if (projectId === 'first') {
      projectId = projects[0].projectId;
      this._currentProjectIndex = 0;
    } else if (projectId === 'last') {
      projectId = projects[projects.length - 1].projectId;
    }
    this._currentProjectId = projectId;
    this.currentCustomer$.subscribe((client: Customer) => {
      client.projects.map((project: Project, index: number) => {
        if (this._currentProjectId === project.projectId) {
          this._currentProjectBS.next(project);
          this._currentProjectIndex = index;
          this.updateSeo();
          this.updateUrl();
        }
      });
      takeUntil(this.destroy$);
    });
  }
  public setDefault(): void {
    this._currentProjectBS.next(this._defaultProject);
  }

  public setNextProject(): void {
    const projects = this._currentCustomerBS.getValue().projects;
    this._currentProjectIndex++;
    if (this._currentProjectIndex >= projects.length) {
      this.setNextCustomer();
      this.setCurrentProject('first');
    } else {
      this._currentProjectBS.next(projects[this._currentProjectIndex]);
      this._currentProjectId = projects[this._currentProjectIndex].projectId;
    }
    this.updateSeo();
    this.updateUrl();
  }

  public setPreviousProject(): void {
    const projects = this._currentCustomerBS.getValue().projects;
    this._currentProjectIndex--;
    if (this._currentProjectIndex < 0) {
      this.setPreviousCustomer();
      this.setCurrentProject('last');
    } else {
      this._currentProjectBS.next(projects[this._currentProjectIndex]);
      this._currentProjectId = projects[this._currentProjectIndex].projectId;
    }
    this.updateSeo();
    this.updateUrl();
  }

  private updateSeo(): void {
    this.seoData.title = 'Glacier Marketing Company - Idaho Falls - Customer: '
    + this._currentCustomerId + ' Project: '
    + this._currentProjectBS.getValue().projectText;
    this.seo.update(this.seoData);
  }

  private updateUrl(): void {
    this.location.replaceState('/project/?customer=' + this._currentCustomerId + '&project=' + this._currentProjectId);
  }

  private setPreviousCustomer(): void {
    const customers = this._allCustomersBS.getValue();
    let index = customers.indexOf(this._currentCustomerBS.getValue());
    index--;
    let customerId = '';
    if (index < 0) {
      customerId = customers[customers.length - 1].customerId;
    } else {
      customerId = customers[index].customerId;
    }
    this.setCustomerProjects(customerId);
  }

  private setNextCustomer(): void {
    const customers = this._allCustomersBS.getValue();
    let index = customers.indexOf(this._currentCustomerBS.getValue());
    index++;
    let customerId = '';
    if (index >= customers.length) {
      customerId = customers[0].customerId;
    } else {
      customerId = customers[index].customerId;
    }
    this.setCustomerProjects(customerId);
  }

  private errorHandler(error): Observable<any> {
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
