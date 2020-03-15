import { ScrollService } from './../services/scroll/scroll.service';
import { DataService } from './../services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeoService } from '../services/seo/seo.service';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Customer } from '../models/customer'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit, OnDestroy {

  public customerId = this.route.snapshot.paramMap.get('id');
  public projectId = this.route.snapshot.paramMap.get('id2');
  private seoData = {
    title: "Glacier Marketing Company - Idaho Falls",
    description: "Check out our portfolio of print design, digital &amp; website design, marketing or branding services. We have the experience to help your business with any marketing needs - all in one team! No need to parsel out your business marketing when you can get the Glacier Marketing services from one company. Call today 208-557-9114.",
    url: 'https://glaciermark.com/project/'
  }
  private destroy$: Subject<boolean> = new Subject();

  public constructor(
    private route: ActivatedRoute,
    private location: Location,
    private seo: SeoService,
    public data: DataService,
    public scroll: ScrollService
    ) {
      this.seo.update(this.seoData);
  }

  public ngOnInit(): void {
    this.data.setCustomerProjects(this.customerId);
    this.data.setCurrentProject(this.projectId);
    this.scroll.scrollUp();
    this.updateSeo();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public

  public switchProject(newId: string): void {
    this.location.replaceState('/project/' + this.customerId + '/' + newId);
    this.data.setCurrentProject(newId);
    this.projectId = newId;
    this.scroll.scrollUpSlow();
    this.seo.update(this.seoData);
  }

  public switchCustomer(newCustId: string, newProjId: string): void {
    this.location.replaceState('/project/' + newCustId + '/' + newProjId);
    this.data.setCustomerProjects(newCustId);
    this.data.setCurrentProject(newProjId);
    this.customerId = newCustId;
    this.projectId = newProjId;
  }

  public updateSeo(): void {
    this.data.currentCustomer$.subscribe(
      (customer: Customer) => {
        this.seoData.title = `${customer.customerName} - Glacier Marketing Company - Idaho Falls`;
        this.seoData.description = customer.customerSummary;
        this.seoData.url = "https://glaciermark.com/project/" + this.customerId + '/' + this.projectId;
        this.seo.update(this.seoData);
      },
      takeUntil(this.destroy$)
    );
  }

}
