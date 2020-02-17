import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-services-header',
  templateUrl: './services-header.component.html',
  styleUrls: ['./services-header.component.less']
})
export class ServicesHeaderComponent implements OnInit {
  @Input() public title: string;
  @Input() public text: string;
  @Input() public src: string;
  @Input() public anchor: string;
  @Input() public background: string;
  @Input() public imgWidth: string;

  public constructor() { }

  ngOnInit(): void {
  }
}
