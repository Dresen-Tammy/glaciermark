import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private isBrowser: boolean;

  public constructor(@Inject(PLATFORM_ID) platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  public scrollUpSlow(): void {
    if (this.isBrowser) {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 30);
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 10);
    }
  }

  public scrollUp(): void {
    if (this.isBrowser) {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, 0);
      }
    }
  }
}
