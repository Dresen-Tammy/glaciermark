import { DataService } from './../services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo/seo.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.less']
})
export class PortfolioComponent implements OnInit {

  public projects: any = [];

  public constructor(
    private seo: SeoService,
    public dataService: DataService
    ) {
    this.seo.update({
      title: 'Print Design, Digital Design, Marketing, Branding, Consulting by Glacier Marketing Idaho Falls',
      // tslint:disable-next-line: max-line-length
      description: 'Check out our portfolio of print design, digital &amp; website design, marketing or branding services. We have the experience to help your business with any marketing needs - all in one team! No need to parsel out your business marketing when you can get the Glacier Marketing services from one company. Call today 208-557-9114.',
      url: 'https://glaciermark.com/portfolio'
    });
  }

  public ngOnInit() {

  }

  public loadProjects() {
    return this.dataService.getProject().subscribe((data: {}) => {
      this.projects = data;
      console.log(this.projects);
    });
  }

  public loadProjects() {
    return this.dataService.getProject().subscribe((data: {}) => {
      this.projects = data;
      console.log(this.projects);
    });
  }

}
