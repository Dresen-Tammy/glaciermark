import { Component, OnInit, ElementRef, HostListener, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { riseAnimation } from 'src/app/animations';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.less'],
  animations: [riseAnimation]
})
export class InformationComponent implements OnInit {
  @Input() public riseValue = 'fall';
  @Input() public delay: string = '0ms';
  @Input() public src: string;
  @Input() public alt: string;
  @Input() public title: string;
  @Input() public text: string;
  @Input() public buttonUrl: string;
  constructor(public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.offsetTop;
      const scrollPosition = window.pageYOffset + window.innerHeight;


      if (scrollPosition >= componentPosition) {
        this.riseValue = 'rise';
      } else {
        this.riseValue = 'fall';
      }
    }

  ngOnInit() {

  }

}
