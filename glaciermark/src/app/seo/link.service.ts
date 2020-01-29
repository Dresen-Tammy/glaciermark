
import { Injectable, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LinkDefinition } from './link-definition.type';

@Injectable({
  providedIn: 'root'
})
export class LinkService implements OnDestroy {

  private routeListener: Subscription;

  public constructor(
    @Inject(DOCUMENT) private readonly document: any,
    private readonly router: Router,
  ) { }

  // Create/update a link tag param LinkDefinition tag
  public updateTag(tag: LinkDefinition): void {
    const selector = this._parseSelector(tag);
    const linkElement = this.document.head.querySelector(selector) as HTMLLinkElement
      || this.document.head.appendChild(this.document.createElement('link'));

    if (linkElement) {
      Object.keys(tag).forEach((prop: string) => {
        linkElement[prop] = tag[prop];
      });
    }
  }


  // Remove link tag from DOM
  public removeTag(tag: LinkDefinition): void {
    const selector = this._parseSelector(tag);
    const linkElement = this.document.head.querySelector(selector) as HTMLLinkElement;

    if (linkElement) {
      this.document.head.removeChild(linkElement);
    }
  }


  // Get link tag, return HTMLLinkElement
  public getTag(tag: LinkDefinition): HTMLLinkElement {
    const selector = this._parseSelector(tag);
    return this.document.head.querySelector(selector);
  }


  // Get all link tags, return NodeListOf<HTMLLinkElement>
  public getTags(): NodeListOf<HTMLLinkElement> {
    return this.document.head.querySelectorAll('link');
  }


  // Parse tag to create selector, return string selector to use in querySelector
  private _parseSelector(tag: LinkDefinition): string {
    const attr: string = tag.rel ? 'rel' : 'hreflang';
    return `link[${attr}="${tag[attr]}"]`;
  }


  // Start listening on NavigationEnd router events
  public startRouteListener(): void {
    this.routeListener = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      () => {
        let url = '';
        const urlTree = this.router.parseUrl(this.router.url);

        if (urlTree.root.hasChildren()) {

          const segments = urlTree.root.children.primary.segments;

          if (segments && segments.length > 0) {
            url = segments.map(segment => segment.path).join('/');
          }
        }

        this.updateTag({
          rel: 'canonical',
          href: `/${url}`
        });
      }
    );
  }

  // Destroy route listener when service is destroyed
  public ngOnDestroy(): void {
    if (this.routeListener) {
      this.routeListener.unsubscribe();
    }
  }
}

