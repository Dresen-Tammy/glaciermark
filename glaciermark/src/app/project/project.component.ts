import { ScrollService } from './../services/scroll/scroll.service';
import { DataService } from './../services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {

  public customerId;
  public projectId;

  public constructor(
    private route: ActivatedRoute,
    public data: DataService,
    public scroll: ScrollService
    ) {
      this.getParams();
  }

  public ngOnInit(): void {
    this.data.setCustomerProjects(this.customerId);
    this.data.setCurrentProject(this.projectId);
    this.scroll.scrollUp();
  }

  public switchProject(newId: string): void {
    this.data.setCurrentProject(newId);
    this.projectId = newId;
    this.scroll.scrollUpSlow();
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
