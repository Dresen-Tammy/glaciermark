import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {

  public constructor(private seo: SeoService) {
    this.seo.update({
      title: 'East Idaho Design &amp; Marketing Firm - Glacier Marketing',
      // tslint:disable-next-line: max-line-length
      description: 'We are a marketing team with decades of experience from radio &amp; TV, print &amp; media to digital &amp; SEO website design. The Glacier team should be your top choice for all your marketing needs - we are a one stop shop marketing company. Whether you need marketing &amp; branding strategy, website design, print &amp; graphic design, our experts are here to help.',
      url: 'https://glaciermark.com/contact'
    });
  }

  public ngOnInit() {
  }
}
