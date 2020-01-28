import { Component, OnInit } from '@angular/core';
import { SeoService } from '../seo/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  public constructor(private seo: SeoService) {
    this.seo.update({
      title: 'East Idaho Design and Marketing Firm - Glacier Marketing',
      // tslint:disable-next-line: max-line-length
      description: 'We are a marketGlacier Marketing is an award-winning design and marketing firm. We can help you create exceptional user experiences at an affordable price.',
      url: 'https://glaciermark.com/home'
    });
  }

  ngOnInit() {
  }

}
