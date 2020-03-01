import { Component, OnInit, Input, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { Project } from 'src/app/models/project';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.less']
})
export class GalleryItemComponent implements OnInit {

  @Input() public project: Project;
  public imageType: string = '-portfolio';

  private isBrowser: boolean;

  @HostListener('window:resize', ['$event'])
  public resizeCheck(event: Event): void {
    this.checkWindowWidth();
  }

  public constructor( @Inject(PLATFORM_ID) platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public ngOnInit(): void {
    this.checkWindowWidth();
  }

  public checkWindowWidth(): void {
    if (this.isBrowser) {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1100 ) {
        this.imageType = '-large';
      } else {
        this.imageType = '-portfolio';
      }
    }
  }
}
