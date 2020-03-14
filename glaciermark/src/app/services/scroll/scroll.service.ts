import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  public constructor() { }


  public scrollUpSlow(): void {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 30);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 10);
  }

  public scrollUp(): void {
    const pos = window.pageYOffset;
    if (pos > 0) {
      window.scrollTo(0, 0);
    }
  }
}
