import { SeoService } from './../seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

  constructor(private seo: SeoService) {
    this.seo.update({
      title: 'About - Glaciermark.com',
      description: 'Meet Glacier Marketing\'s team and see what we can do for you.',
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
  }

}
