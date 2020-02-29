import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.less']
})
export class SectionHeaderComponent implements OnInit {
  @Input() public src: string;
  @Input() public header: string;
  @Input() public h1Header: string;
  @Input() public headerColor: string;
  @Input() public paragraph: string;
  @Input() public paragraphColor: string;
  @Input() public alt: string;
  @Input() public backgroundImg: string;
  @Input() public iconWidth: string = '64px';
  constructor() { }

  ngOnInit(): void {
  }

}
