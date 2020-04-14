import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.less']
})
export class GalleryItemComponent implements OnInit {

  @Input() public project: Project;

  public constructor() {
  }

  public ngOnInit(): void {
  }
}
