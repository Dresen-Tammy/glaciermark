import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
  animations: [
    trigger('fade',
    [
      state('void', style({ opacity: 0})),
      transition(':enter', [ animate(300)]),
      transition(':leave', [ animate(500)]),
    ])
  ]
})

export class NavbarComponent implements OnInit {
  public logoSrc: string = 'glacier-marketing';
  public sticky: boolean = false;
  public pageName: string = 'home';
  public className: string = 'home-nav';
  public subscriptions: Subscription[] = [];
  public navigation: {} = [
    {
      title: 'HOME',
      link: 'home'
    },
    {
      title: 'ABOUT',
      link: 'about'
    },
    {
      title: 'SERVICES',
      link: 'services'
    },
    {
      title: 'CONTACT',
      link: 'contact'
    },
    {
      title: 'PORTFOLIO',
      link: 'portfolio'
    }
  ];

  public constructor(private router: Router) {}

  ngOnInit(): void {
    this.sticky = false;
  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(): void {
    this.setSticky();
  }

  private setSticky(): void {
    if (window.pageYOffset > 5) {
      this.stickyTrue();
    } else {
      this.stickyFalse();
    }
  }

  private stickyTrue(): void {
    this.sticky = true;
    this.logoSrc = 'glacierLogo';
  }

  private stickyFalse(): void {
    this.sticky = false;
    if (this.className === 'home-nav') {
      this.logoSrc = 'glacier-marketing';
    }
  }

}
