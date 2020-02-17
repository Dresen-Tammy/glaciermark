import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo/seo.service';


@Component({
  selector: 'app-services',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.less']
})
export class ServicesPageComponent implements OnInit {

  public className: string = 'sub-action';
  public buttonUrl: string = '/contact';

  public constructor(
    private seo: SeoService,
  ) {
    this.seo.update({
      title: 'Print Design, Digital Design, Marketing, Branding, Consulting by Glacier Marketing Idaho Falls',
      // tslint:disable-next-line: max-line-length
      description: 'Successful marketing should include everything from branding to graphic design, media placement (TV, radio), social and mobile marketing, SEO/PPC and website design. Why go to three or four sources when you can have all this marketing expertise from one team - the Glacier Marketing advertising agency serving South East Idaho.',
      url: 'https://glaciermark.com/services'
    });
  }

  public ngOnInit() {
  }
}
