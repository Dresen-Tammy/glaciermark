import { OfferingTile } from './../../../../models/offering-tile';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-services-tile',
  templateUrl: './services-tile.component.html',
  styleUrls: ['./services-tile.component.less']
})
export class ServicesTileComponent implements OnInit {
  @Input() offering: OfferingTile;

  public constructor() { }

  public ngOnInit(): void {
  }

}
