// learned from Gaurav Foujdar at https://medium.com/fove/angular-parallax-d1c2de9f07a6
import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  @Input('ratio') parallaxRatio : number = 1;
  @Input('top') initialTop: number = 0;


  public constructor(private el: ElementRef) {
    this.initialTop = this.el.nativeElement.getBoundingClientRect().top
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event){
    this.el.nativeElement.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px';
  }
}
