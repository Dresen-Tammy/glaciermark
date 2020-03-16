// learned from Gaurav Foujdar at https://medium.com/fove/angular-parallax-d1c2de9f07a6
import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  @Input('ratio') parallaxRatio : number = 1;
  private initialTop: number = 0;
  private newTop: string;

  public constructor(
    private el: ElementRef,
    private render: Renderer2
  ) {
    this.initialTop = this.el.nativeElement.getBoundingClientRect().top;
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event){
    this.newTop = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px';
    this.render.setStyle(this.el.nativeElement, 'top', this.newTop);
  }
}
