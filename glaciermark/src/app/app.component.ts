import { DataService } from './services/data/data.service';
import { Subscription } from 'rxjs';
import { SeoService } from './services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { SeoConfig } from './services/seo/seo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
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
      title: 'CONTACT',
      link: 'contact'
    },
    {
      title: 'PORTFOLIO',
      link: 'portfolio'
    }
  ];

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
}
