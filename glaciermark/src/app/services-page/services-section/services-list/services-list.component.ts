import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.less']
})
export class ServicesListComponent implements OnInit {
  @Input() public offerings;

  public constructor() { }

  public ngOnInit(): void {
  }

}
