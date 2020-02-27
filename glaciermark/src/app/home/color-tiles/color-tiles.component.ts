import { slideUpAnimation } from 'src/app/animations';
import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-color-tiles',
  templateUrl: './color-tiles.component.html',
  styleUrls: ['./color-tiles.component.less'],
  animations: [slideUpAnimation]
})
export class ColorTilesComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() buttonUrl: string;
  @Input() class: string;
  @Input() public riseValue = 'up';
  @Input() public delay: string = '0ms';

  public constructor(private el: ElementRef) { }

  public ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.offsetTop;
      const scrollPosition = window.pageYOffset + window.innerHeight;


      if (scrollPosition >= componentPosition) {
        this.riseValue = 'up';
      } else {
        this.riseValue = 'down';
      }
    }
}
