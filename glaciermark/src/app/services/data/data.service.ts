import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { retry, tap, map, takeUntil } from 'rxjs/operators';
import { Project } from '../../models/project';
import { Customer } from '../../models/customer';
import { SaveAs } from 'file-saver';
import { ServerCustomer } from 'src/app/models/server-customer';

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
  public readonly prevNextCustomer$: Observable<string[]>;
  public readonly prevNextProject$: Observable<string[]>;
  public readonly portfolio$: Observable<Array<Project>>;


  private _currentCustomerId: string = 'loading';
  private _currentProjectId: string = 'loading';
  private _defaultProject: Project;
  private _defaultCustomer: Customer;
  private _allCustomersBS: BehaviorSubject<Array<Customer>>;
  private _currentCustomerBS: BehaviorSubject<Customer>;
  private _currentProjectBS: BehaviorSubject<Project>;
  private _prevNextCustomerBS: BehaviorSubject<string[]>;
  private _prevNextProjectBS: BehaviorSubject<string[]>;
  private _portfolioBS: BehaviorSubject<Array<Project>>;
  private destroy$: Subject<boolean> = new Subject<boolean>();

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
    this._defaultCustomer = new Customer();
    this._defaultCustomer.customerId = 'loading';
    this._defaultCustomer.customerName = 'Loading';
    this._defaultCustomer.customerSummary = '';
    this._defaultCustomer.projects = [this._defaultProject];

    this._allCustomersBS = new BehaviorSubject<Array<Customer>>([this._defaultCustomer]);
    this._currentCustomerBS = new BehaviorSubject(this._defaultCustomer);
    this._currentProjectBS = new BehaviorSubject(this._defaultProject);
    this._prevNextCustomerBS = new BehaviorSubject(['', '']);
    this._prevNextProjectBS = new BehaviorSubject(['', '']);
    this._portfolioBS = new BehaviorSubject<Array<Project>>([this._defaultProject]);
    this.allCustomers$ = this._allCustomersBS.asObservable();
    this.currentCustomer$ = this._currentCustomerBS.asObservable();
    this.currentProject$ = this._currentProjectBS.asObservable();
    this.prevNextCustomer$ = this._prevNextCustomerBS.asObservable();
    this.prevNextProject$ = this._prevNextProjectBS.asObservable();
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
      tap((client: any) => {
        const clientsData: Customer[] = [];
        const projectsArray: Project[] = [];
        client.map((item: ServerCustomer) => {
          clientsData.push(item.data);
          item.data.projects.map((project: Project) => {
            if (project.portfolio) {
              projectsArray[project.projectId] = project;
            }
          });
        });
        this._allCustomersBS.next(clientsData);
        this._portfolioBS.next(projectsArray);
        // this.getRoutesFromClients();
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
          this.setPrevNextCustomer(index);
          this._currentCustomerBS.next(client);
        }
      });
      takeUntil(this.destroy$);
    });
  }

  public setCurrentProject(projectId: string = 'none'): void {
    if (projectId === 'none') {
      const currentCustomer = this._currentCustomerBS.getValue();
      projectId = currentCustomer.projects[0].projectId;
    }
    this._currentProjectId = projectId;
    this._currentCustomerBS.subscribe((client: Customer) => {
      client.projects.map((project: Project) => {
        if (this._currentProjectId === project.projectId) {
          this._currentProjectBS.next(project);
          this.setPrevNextProject(project);
        }
      });
      takeUntil(this.destroy$);
    });
  }

  private setPrevNextProject(project: Project): void {
    const customerProjects: Array<Project> = this._currentCustomerBS.getValue().projects;
    if (customerProjects !== undefined) {
      const index: number = customerProjects.indexOf(project);
      const nextIndex: number = this.findNextIndex(index, customerProjects.length);
      const prevIndex: number = this.findPrevIndex(index, customerProjects.length);
      this._prevNextProjectBS.next([customerProjects[prevIndex].projectId, customerProjects[nextIndex].projectId]);
    }
  }

  private findPrevIndex(index: number, length: number): number {
    let prev: number = index - 1;
    if (prev < 0) {
      prev = length - 1;
    }
    return prev;
  }

  private findNextIndex(index: number, length: number): number {
    let next: number = index + 1;
    if (next >= length) {
      next = 0;
    }
    return next;
  }

  private setPrevNextCustomer(index: number): void {
    this.allCustomers$.subscribe((clients: Array<Customer>) => {
        const length = clients.length;
        const prevIndex = this.findPrevIndex(index, length);
        const nextIndex = this.findNextIndex(index, length);
        this._prevNextCustomerBS.next([clients[prevIndex].customerId, clients[nextIndex].customerId]);

    },
    takeUntil(this.destroy$)
    );
  }

  public getRoutesFromClients(): void {
    let routes = ``;
    this._allCustomersBS.getValue().forEach(client => {
      const clientId = client.customerId;
      client.projects.forEach(project => {
          routes += `/project/${clientId}/${project.projectId}\n`;
      });
    });
    const file = new File([routes], '../../../../Routes.txt', {type: 'text/plain;charset=utf-8'});
    SaveAs(file);
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

    // public getProject(): Observable<Project> {
  //   return this.http.get<Project>(this.baseurl + '/projects')
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorHandler)
  //   );
  // }

  // public getProjects(): Observable<Project[]> {
  //   const projects: Observable<Array<Project>> = this.http.get<Array<Project>>(this.baseurl + '/projects').pipe(
  //     retry(1),
  //     tap((project: any) => {
  //       const projectsData: Project[] = [];
  //       const projectsArray: Project[] = [];
  //       const customerArray: Set<string> = new Set();
  //       project.map((item: ServerProject) => {
  //         projectsData.push(item.data);
  //         if (item.data.portfolio) {
  //           projectsArray.push(item.data);
  //           customerArray.add(item.data.customerId);
  //         }
  //       });
  //       this._projectsBS.next(projectsData);
  //       this._portfolioBS.next(projectsArray);
  //       this.setCustomers(customerArray);
  //       // this.getRoutes();
  //     },
  //     takeUntil(this.destroy$)
  //     )
  //   );
  //   // this.allProjects$.subscribe();
  //   return projects;
  // }

  // public getRoutes(): void {
  //   const projects: Array<Project> = this._projectsBS.getValue();
  //   let routes = ``;
  //   if (projects.length > 1) {
  //     projects.forEach((project) => {
  //       routes += `/project/${project.customerId}/${project.projectId}\n`;
  //     });
  //     const file = new File([routes], '../../../../Routes.txt', {type: 'text/plain;charset=utf-8'});
  //     SaveAs(file);
  //   }
  // }
    // public getDefaultProject(): Project {
  //   return this._defaultProject;
  // }

  // public getDefaultClient(): Customer {
  //   return this._defaultCustomer;
  // }

  // public getCustomers(): string[] {
  //   return this._customers;
  // }

  // private setCustomers(customers: Set<string>): void {
  //   this._customers = Array.from(customers);
  // }
}
