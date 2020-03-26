import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-services-tile',
  templateUrl: './services-tile.component.html',
  styleUrls: ['./services-tile.component.less']
})
export class ServicesTileComponent implements OnInit {
  @Input() public set src(src: string) {
    this._webpSource = '../../../assets/images/offering/' + src + '-300x300.webp';
    this._jpgSource = '../../../assets/images/offering/' + src + '-300x300.jpg';
  }
  public get webpsource(): string {
    return this._webpSource;
  }
  public get jpgsource(): string {
    return this._jpgSource;
  }
  @Input() public alt: string;
  @Input() public title: string;
  @Input() public text: string;
  @Input() public text2: string;
  @Input() public set keytext(value: string) {
    this._keywords = value.split(',');
  }
  public get keywords(): string[] {
    return this._keywords;
  }
  private _keywords: string[];
  private _webpSource: string;
  private _jpgSource: string;
  public constructor() { }

  public ngOnInit(): void {
  }
}
