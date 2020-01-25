import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';

const servicesRoute: Routes = [
  { path: 'services', component: ServicesComponent}
]

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(servicesRoute)
  ]
})
export class ServicesModule { }
