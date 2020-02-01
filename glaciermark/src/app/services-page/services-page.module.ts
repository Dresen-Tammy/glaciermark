import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesPageComponent } from './services-page.component';

const servicesPageRoute: Routes = [
  { path: 'services', component: ServicesPageComponent}
]

@NgModule({
  declarations: [ServicesPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(servicesPageRoute)
  ]
})
export class ServicesPageModule { }
