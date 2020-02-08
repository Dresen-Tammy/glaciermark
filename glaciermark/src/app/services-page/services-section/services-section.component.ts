import { Component, OnInit, Input } from '@angular/core';
import { OfferingSection } from '../../models/offering-section';
import { OfferingTile } from '../../models/offering-tile';

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.less']
})
export class ServicesSectionComponent implements OnInit {
  @Input() public offering: OfferingSection;
  public offeringTiles: OfferingTile[];

  public constructor() { }

  public ngOnInit(): void {
    this.offeringTiles = this.offering.offeringTiles;
  }

}
