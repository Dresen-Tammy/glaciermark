import { SharedModule } from './../shared/shared.module';
import { PortfolioComponent } from './portfolio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';

const portfolioRoute: Routes = [
  { path: '', 
    children: [
      {
        path: '',
        component: PortfolioComponent 
      }
    ]
  }
];


@NgModule({
  declarations: [PortfolioComponent, GalleryItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(portfolioRoute)
  ],
  exports: [RouterModule]
})
export class PortfolioModule { }
