import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-services-tile',
  templateUrl: './services-tile.component.html',
  styleUrls: ['./services-tile.component.less']
})
export class ServicesTileComponent implements OnInit {
  @Input() public src: string;
  @Input() public alt: string;
  @Input() public title: string;
  @Input() public text: string;
  @Input() public text2: string;
  @Input() public set keytext(value: string) {
    this.keywords = value.split(',');


  }

  public keywords: string[];

  public constructor() { }

  public ngOnInit(): void {
  }

}
