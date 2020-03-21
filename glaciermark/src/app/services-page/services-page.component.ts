import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../services/seo/seo.service';

@Component({
  selector: 'app-services',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.less']
})
export class ServicesPageComponent implements OnInit, AfterViewChecked {

  public className: string = 'sub-action';
  public buttonUrl: string = '/contact';
  public anchor: string;
  private done: number = 0;

  public constructor(
    private seo: SeoService,
    private vscroll: ViewportScroller,
    private router: ActivatedRoute
  ) {
    this.seo.update({
      title: 'Print Design, Digital Design, Marketing, Branding, Consulting by Glacier Marketing Idaho Falls',
      // tslint:disable-next-line: max-line-length
      description: "Today's successful marketing should include everything from branding to graphic design, media placement (TV and radio), social and mobile marketing, SEO/PPC and website design. Why go to three or four sources when you can have all this marketing expertise from one team - the Glacier Marketing advertising agency serving South East Idaho",
      url: 'https://glaciermark.com/services'
    });

    this.anchor = this.router.snapshot.queryParamMap.get('scroll');
  }

  public ngOnInit() {
    if (!this.anchor) {
      this.vscroll.scrollToPosition([0, 0]);
    }
  }

  public ngAfterViewChecked() {
    if (this.anchor && this.done < 2) {
      this.vscroll.setOffset([0, 70]);
      this.vscroll.scrollToAnchor(this.anchor);
      this.done++;
    }
  }
}
