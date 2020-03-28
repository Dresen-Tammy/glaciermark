import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.less']
})
export class TeamMemberComponent implements OnInit {
  @Input() public set imgUrl(src: string) {
    this._jpgSrc = '../../../assets/images/team/' + src + '.jpg';
    this._webpSrc = '../../../assets/images/team/' + src + '.webp';
  }
  public get jpgSrc() {
    return this._jpgSrc;
  }
  public get webpSrc() {
    return this._webpSrc;
  }
  @Input() public name: string;
  @Input() public title: string;
  @Input() public set content(value: string) {
    this._paragraphs = value.split('PP');
  }
  public get paragraphs(): string[] {
    return this._paragraphs;
  }

  private _paragraphs: string[];
  private _jpgSrc: string;
  private _webpSrc: string;
  constructor() { }

  ngOnInit(): void {
  }

}
