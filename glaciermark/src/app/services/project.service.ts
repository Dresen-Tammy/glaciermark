import { takeUntil } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { DataService } from './data/data.service';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnDestroy {

  public readonly currentCustomer$: Observable<Array<Project>>;
  public readonly currentProject$: Observable<Project>;

  private _currentCustomerBS: BehaviorSubject<Array<Project>>;
  private _currentProjectBS: BehaviorSubject<Project>;
  private currentCustomerId: string;
  private currentProjectId: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private data: DataService) {
    const defaultProject = this.data.getDefaultProject();
    this.currentCustomerId = defaultProject.customerId;
    this.currentProjectId = defaultProject.projectId;
    this._currentCustomerBS = new BehaviorSubject([defaultProject]);
    this.currentCustomer$ = this._currentCustomerBS.asObservable();
    this._currentProjectBS = new BehaviorSubject(defaultProject);
    this.currentProject$ = this._currentProjectBS.asObservable();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public setCustomerProjects(customerId: string): void {
    this.currentCustomerId = customerId;
    const customerArray: Project[] =  [];
    this.data.allProjects$.subscribe((projects: Array<Project>) => {
      projects.map((project: Project) => {
        if (project.customerId === this.currentCustomerId) {
          customerArray.push(project);
        }
      });
      if (customerArray.length > 0) {
        this._currentCustomerBS.next(customerArray);
      }
      takeUntil(this.destroy$);
    });
  }

  public setCurrentProject(projectId: string): void {
    this.currentProjectId = projectId;
    this._currentCustomerBS.subscribe((projects: Project[]) => {
      projects.map((project: Project) => {
        if (this.currentProjectId === project.projectId) {
          this._currentProjectBS.next(project);
        }
      });
      takeUntil(this.destroy$);
    });
  }


}
