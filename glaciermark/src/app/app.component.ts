import { takeUntil, startWith, map, distinctUntilChanged, filter, take, tap } from 'rxjs/operators';
import { menuAnimation } from './animations';
import { DataService } from './services/data/data.service';
import { Subject, interval, of } from 'rxjs';
import { SeoService } from './services/seo/seo.service';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { SeoConfig } from './services/seo/seo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [menuAnimation]
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
  private destroy$: Subject<boolean> = new Subject();
  private loaded$: Subject<boolean> = new Subject();
  private config: SeoConfig = {
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

  public constructor(
    private seo: SeoService,
    private data: DataService,
    private zone: NgZone
    ) {}

    public ngOnInit(): void {
      this.delayInit();
      this.seo.initializeBaseMeta(this.config);

      // this.data.initialize()
      // .subscribe(() => {},
      // takeUntil(this.destroy$));
    }

    public ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }

    public delayInit(): void {
      // adapted from Aaron Frost at https://dev.to/herodevs/route-fully-rendered-detection-in-angular-2nh4
      console.log('indelay');
      this.zone.runOutsideAngular(() => {
        interval(10)
          .pipe(
            startWith(0),
            takeUntil(this.loaded$),
            map(() => !this.zone.hasPendingMacrotasks),
            distinctUntilChanged(),
            filter(stateStable => stateStable === true),
            take(1),
            tap(stateStable => {
              this.zone.run(() => {
                this.loaded$.next(true);
                this.loaded$.complete();
                this.data.initialize()
                .subscribe((data) => {console.log(this.data);},
                takeUntil(this.destroy$));
              });
            })
          ).subscribe();
      });
    }

    public toggleOpen(): void {
      if (this.opened) {
        this.opened = false;
        this.openValue = 'close';
      } else {
        this.opened = true;
        this.openValue = 'open';
      }
    }

      public toggleClose(): void {
        if (this.opened) {
          this.opened = false;
          this.openValue = 'close';
        }
      }
}
