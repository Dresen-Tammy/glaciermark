import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo/seo.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {

  public projectId = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService
    ) {
      this.seo.update({
      title: 'Glacier Marketing Company - Idaho Falls - Project: ' + this.projectId,
      // tslint:disable-next-line: max-line-length
      description: 'Check out our portfolio of print design, digital &amp; website design, marketing or branding services. We have the experience to help your business with any marketing needs - all in one team! No need to parsel out your business marketing when you can get the Glacier Marketing services from one company. Call today 208-557-9114.',
      url: 'https://glaciermark.com/portfolio'
    });
  }

  public ngOnInit() {
  }

}
