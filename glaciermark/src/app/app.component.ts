import { DataService } from './services/data/data.service';
import { Subscription } from 'rxjs';
import { SeoService } from './services/seo/seo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeoConfig } from './services/seo/seo.interface';
import { trigger, state, style, animate, transition, query, group, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [trigger('menuAnimation', [
    state('open', style({})),
    state('close', style({})),
    transition('open => close', [
      group([
      query('.icon1', animate('.5s', keyframes([
        style({ width: '24px', transform: 'translate(0px, 20px) rotate(0.125turn)', offset: 0}),
        style({ width: '24px', transform: 'translate(0px, 20px) rotate(0turn)', offset: .33}),
        style({ width: '24px', transform: 'translate(0px, 12px) rotate(0turn)', offset: .67}),
        style({ width: '18px', transform: 'translate(0px, 12px) rotate(0turn)', offset: 1})
      ]))),
      query('.icon2', animate('.5s', keyframes([
        style({transform: 'translate(0px, 20px) rotate(-.125turn)', offset: 0}, ),
        style({transform: 'translate(0px, 20px) rotate(0turn)', offset: .33}, ),
        style({transform: 'translate(0px, 20px) rotate(0turn)', offset: 1}, )
      ]))),
      query('.icon3', animate('.5s', keyframes([
        style({ width: '24px', transform: 'translate(0px, 20px) rotate(-.125turn)', offset: 0}),
        style({ width: '24px', transform: 'translate(0px, 20px) rotate(0turn)', offset: .33}),
        style({ width: '24px', transform: 'translate(0px, 28px) rotate(0turn)', offset: .67}),
        style({ width: '12px', transform: 'translate(0px, 28px) rotate(0turn)', offset: 1})
      ]))),
    ]),
  ]),
    transition('close => open', [
      group([
        query('.icon1', animate('.5s', keyframes([
          style({ width: '18px', transform: 'translate(0px, 12px) rotate(0turn)', offset: 0}),
          style({ width: '24px', transform: 'translate(0px, 12px) rotate(0turn)', offset: .33}),
          style({ width: '24px', transform: 'translate(0px, 20px) rotate(0turn)', offset: .67}),
          style({ width: '24px', transform: 'translate(0px, 20px) rotate(0.125turn)', offset: 1})
        ]))),
        query('.icon2', animate('.5s', keyframes([
          style({transform: 'translate(0px, 20px) rotate(0turn)', offset: 0}, ),
          style({transform: 'translate(0px, 20px) rotate(0turn)', offset: .67}, ),
          style({transform: 'translate(0px, 20px) rotate(-.125turn)', offset: 1}, )
        ]))),
        query('.icon3', animate('.5s', keyframes([
          style({ width: '12px', transform: 'translate(0px, 28px) rotate(0turn)', offset: 0}),
          style({ width: '24px', transform: 'translate(0px, 28px) rotate(0turn)', offset: .33}),
          style({ width: '24px', transform: 'translate(0px, 20px) rotate(0turn)', offset: .67}),
          style({ width: '24px', transform: 'translate(0px, 20px) rotate(-.125turn)', offset: 1})
        ]))),
      ])
  ])
  ])]
})
export class AppComponent implements OnInit, OnDestroy {
  public navigation: {} = [
    {
      title: 'HOME',
      link: 'home'
    },
    {
      title: 'ABOUT',
      link: 'about'
    },
    {
      title: 'SERVICES',
      link: 'services'
    },
    {
      title: 'PORTFOLIO',
      link: 'portfolio'
    },
    {
      title: 'CONTACT',
      link: 'contact'
    }
  ];
  public opened: boolean = false;
  public openValue: string = 'close';
  private subscriptions: Subscription[];

  public constructor(
    private seo: SeoService,
    private data: DataService
    ) {
      const config: SeoConfig = {
        title: 'Glacier Marketing',
        // tslint:disable-next-line: max-line-length
        description: 'Glacier Marketing - an award-winning design and marketing firm. We can help you create exceptional user experiences at an affordable price.',
        locale: 'en_US',
        url: 'https:/glaciermark.com',
        type: 'website',
        msapplicationTileColor: '#000',
        themeColor: '#fff',
        og: {
          site_name: 'Glacier Marketing',
          image_url: 'https://glaciermark.com/meta/og-image.png'
        },
        twitter: {
          image_url: 'https://glaciermark.com/meta/twitter-image.png',
          summary_card: 'summary_large_image'
        },
        keywords: 'glacier, marketing, branding, experience design, seo/mobile, consulting, media placement, campaign management',
        article: {
          tags: ['marketing', 'glacier'],
          section: 'glacier'
        },
        link: [
          { rel: 'alternate', type: 'application/rss+xml', title: 'RSS', href: 'https://glacirmark.com'},
          { rel: 'canonical', href: 'https://glaciermark.com/home'}
        ],
      };
      // initialize base Meta setup
      this.seo.initializeBaseMeta(config);
      data.initialize().subscribe(() => {
      });
    }

    public ngOnInit(): void {}

    public ngOnDestroy(): void {

    }

    public toggleOpen(): void {
      console.log('toggleOpen triggered');
      if (this.opened) {
        this.opened = false;
        this.openValue = 'close';
      } else {
        this.opened = true;
        this.openValue = 'open';
      }
    }

      public toggleClose(): void {
        console.log('toggleClose triggered');
        if (this.opened) {
          this.opened = false;
          this.openValue = 'close';
        }
      }
}
