import { ProjectService } from './../services/project.service';
import { DataService } from './../services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo/seo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {

  public customerId = this.route.snapshot.paramMap.get('id');
  public projectId = this.route.snapshot.paramMap.get('id2');

  public constructor(
    private route: ActivatedRoute,
    private location: Location,
    private seo: SeoService,
    public projectService: ProjectService
    ) {
      this.seo.update({
      title: 'Glacier Marketing Company - Idaho Falls - Project: ' + this.projectId,
      // tslint:disable-next-line: max-line-length
      description: 'Check out our portfolio of print design, digital &amp; website design, marketing or branding services. We have the experience to help your business with any marketing needs - all in one team! No need to parsel out your business marketing when you can get the Glacier Marketing services from one company. Call today 208-557-9114.',
      url: 'https://glaciermark.com/portfolio'
    });
  }

  public ngOnInit() {
    this.projectService.setCustomerProjects(this.customerId);
    this.projectService.setCurrentProject(this.projectId);
  }

  public switchProject(newId: string): void {
    this.location.replaceState('/project/' + this.customerId + '/' + newId);
    this.projectService.setCurrentProject(newId);
  }

}
