import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.less']
})
export class CallToActionComponent implements OnInit {
  @Input() public buttonUrl: string;
  @Input() public className: string;
  constructor() { }

  ngOnInit(): void {
  }

}
