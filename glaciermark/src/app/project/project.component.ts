import { DataService } from './../services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit, OnDestroy {

  public customerId;
  public projectId;

  public constructor(
    private route: ActivatedRoute,
    public data: DataService
    ) {
      this.getParams();
  }

  public ngOnInit(): void {
    this.data.setCustomerProjects(this.customerId);
    this.data.setCurrentProject(this.projectId);
    this.updateSeo();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public

  public switchProject(newId: string): void {
    this.data.setCurrentProject(newId);
    this.projectId = newId;
  }

  public previousProject(): void {
    this.data.setPreviousProject();
  }

  public nextProject(): void {
    this.data.setNextProject();
  }

  private getParams(): void {
    this.customerId = this.route.snapshot.queryParamMap.get('customer');
    this.projectId = this.route.snapshot.queryParamMap.get('project');
  }

}
