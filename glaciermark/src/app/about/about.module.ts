import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const aboutRoute: Routes = [
  { path: 'about', component: AboutComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(aboutRoute)
  ],
  exports: [RouterModule]
})
export class AboutModule { }
