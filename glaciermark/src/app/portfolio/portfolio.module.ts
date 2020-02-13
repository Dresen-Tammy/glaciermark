import { SharedModule } from './../shared/shared.module';
import { PortfolioComponent } from './portfolio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const portfolioRoute: Routes = [
  { path: 'portfolio', component: PortfolioComponent }
];


@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(portfolioRoute)
  ],
  exports: [RouterModule]
})
export class PortfolioModule { }
