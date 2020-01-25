import { PortfolioComponent } from './portfolio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const portfolioRoute: Routes = [
  {path: 'portfolio', component: PortfolioComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(portfolioRoute)
  ]
})
export class PortfolioModule { }
