import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.less']
})
export class TeamMemberComponent implements OnInit {
  @Input() public  imgUrl: string;
  @Input() public name: string;
  @Input() public title: string;
  @Input() public set content(value: string) {
    this._paragraphs = value.split('PP');
  }
  public get paragraphs(): string[] {
    return this._paragraphs;
  }

  private _paragraphs: string[];

  public constructor() { }

  ngOnInit(): void {
  }

}
