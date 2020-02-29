import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.less']
})
export class GalleryItemComponent implements OnInit {
  @Input() public project: Project;
  public imageType: string = '-portfolio';

  @HostListener('window:resize', ['$event'])
  public resizeCheck(event: Event): void {
    this.checkWindowWidth();
  }

  public constructor() { }

  public ngOnInit(): void {
    this.checkWindowWidth();
  }


  public checkWindowWidth(): void {
    const windowWidth = window.innerWidth;

    if (windowWidth < 1100 ) {
      this.imageType = '-portfolio';
    } else {
      this.imageType = '-large';
    }
    console.log(this.imageType );
  }
}

// public customerSummary?: string; // description on client page
//   public customerName?: string; // to pick projects for client page from portfolio
//   public customerId?: string;
//   public hero?: boolean; // if hero === 1, project goes on home page.
//   public projectId: string; // to pick which project is main image from porfolio
//   public portfolio?: boolean;
//   public projectClass: string; // class will be hard coded on each page. Needs to be an image for each class size.
//   public projectType: string; // to filter by project type
//   public projectText?: string; // information about project for client page when project hero is shown
//   public src: string;  // image src for image. Suffix will be added on page to determine size (thumb or hero), srcSet derived from this
//   public audio?: string; // path to audio clip
//   public video?: string; // for video clips
