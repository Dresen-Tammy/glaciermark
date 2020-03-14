import { ScrollService } from './../services/scroll/scroll.service';
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
  public seoData = {
    title: 'Glacier Marketing Company - Idaho Falls - Project: ' + this.projectId,
    // tslint:disable-next-line: max-line-length
    description: 'Check out our portfolio of print design, digital &amp; website design, marketing or branding services. We have the experience to help your business with any marketing needs - all in one team! No need to parsel out your business marketing when you can get the Glacier Marketing services from one company. Call today 208-557-9114.',
    url: 'https://glaciermark.com/portfolio'
  };

  public constructor(
    private route: ActivatedRoute,
    private location: Location,
    private seo: SeoService,
    public data: DataService,
    public scroll: ScrollService
    ) {
      this.seo.update(this.seoData);
  }

  public ngOnInit() {
    this.data.setCustomerProjects(this.customerId);
    this.data.setCurrentProject(this.projectId);
    this.scroll.scrollUp();
  }

  public switchProject(newId: string): void {
    this.location.replaceState('/project/' + this.customerId + '/' + newId);
    this.data.setCurrentProject(newId);
    this.projectId = newId;
    this.scroll.scrollUpSlow();
    this.seo.update(this.seoData);
  }

  public switchCustomer(newId: string): void {
    this.location.replaceState('/project/' + newId);
    this.data.setCustomerProjects(newId);
    this.data.setCurrentProject();
    this.customerId = newId;
    this.scroll.scrollUpSlow();
    this.seo.update(this.seoData);
  }

}
