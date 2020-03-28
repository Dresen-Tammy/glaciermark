import { ViewportScroller } from '@angular/common';
import { SeoService } from './../services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

  public constructor(
    private seo: SeoService,
    private scroll: ViewportScroller
    ) {
    this.seo.update({
      title: 'About - Glaciermark.com',
      // tslint:disable-next-line: max-line-length
      description: 'We are a marketing team with decades of experience from radio &amp; TV, print and media to digital and SEO website design. The Glacier team should be your top choice for all your marketing needs - we are a one stop shop marketing company. Whether you need marketing and branding strategy, website design, print and graphic design, our experts are here to help.',
      url: 'https://glaciermark.com/about'
    });

    this.seo.updateStructuredData(
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        url: 'https://glaciermark.com',
        name: 'Glacier Marketing',
        contactPoint: {
          '@type': 'ContactPoint',
          website: 'https://glaciermark.com',
          contactType: 'Consulting'
        }
      }
    );
  }


  public ngOnInit() {
    this.scroll.scrollToPosition([0, 0]);
  }

}
