import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {


  public constructor(
    private seo: SeoService,
    private scroll: ViewportScroller
  ) {
    this.seo.update({
      title: 'East Idaho Design &amp; Marketing Firm - Glacier Marketing',
      // tslint:disable-next-line: max-line-length
      description: "Contact Glacier Marketing company in Idaho Falls serving businesses across South East Idaho with print, digital, website, branding, SEO &amp; more marketing. Our team has decades of experience in all marketing channels to help your business get found and get customers. Contact Glacier Marketing firm today at 208-557-9114.",
      url: 'https://glaciermark.com/contact'
    });
  }
  public ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }
}
