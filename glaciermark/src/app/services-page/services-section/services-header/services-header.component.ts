import { Component, OnInit, Input } from '@angular/core';
import { OfferingHeader } from '../../../models/offering-header';

@Component({
  selector: 'app-services-header',
  templateUrl: './services-header.component.html',
  styleUrls: ['./services-header.component.less']
})
export class ServicesHeaderComponent implements OnInit {
  @Input() public offering: OfferingHeader;
  constructor() { }

  ngOnInit(): void {
  }

}
