import { ViewportScroller } from '@angular/common';
import { DataService } from './../services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';

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
    public vscroll: ViewportScroller,
    public el: ElementRef
    ) {
      this.getParams();
  }

  public ngOnInit(): void {
    this.data.setCustomerProjects(this.customerId);
    this.data.setCurrentProject(this.projectId);
    this.vscroll.scrollToPosition([0, 0]);
    this.vscroll.setOffset([0, 80]);
  }

  public switchProject(newId: string): void {
    this.data.setDefault();
    this.data.setCurrentProject(newId);
    this.projectId = newId;
    this.scrollUpAnchor();
  }

  public previousProject(): void {
    this.data.setDefault();
    this.data.setPreviousCustomer();
    this.scrollUpAnchor();
  }

  public nextProject(): void {
    this.data.setDefault();
    this.data.setNextCustomer();
    this.scrollUpAnchor();
  }

  private getParams(): void {
    this.customerId = this.route.snapshot.queryParamMap.get('customer');
    this.projectId = this.route.snapshot.queryParamMap.get('project');
  }

  private scrollUpAnchor(): void {
    this.vscroll.scrollToAnchor('project');
  }

}
