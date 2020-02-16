import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.less']
})
export class InformationComponent implements OnInit {
  @Input() public src: string;
  @Input() public alt: string;
  @Input() public title: string;
  @Input() public text: string;
  @Input() public buttonUrl: string;
  @Input() public animation: string;
  @Input() public speed: string = 'fast';
  @Input() public delay: number;
  constructor() { }

  ngOnInit(): void {
  }

}
