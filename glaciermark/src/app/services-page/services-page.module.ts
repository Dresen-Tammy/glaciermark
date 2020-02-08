import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesPageComponent } from './services-page.component';
import { ServicesHeaderComponent } from './services-header/services-header.component';
import { ServicesTileComponent } from './services-tile/services-tile.component';

const servicesPageRoute: Routes = [
  { path: 'services', component: ServicesPageComponent}
]

@NgModule({
  declarations: [
    ServicesPageComponent,
    ServicesHeaderComponent,
    ServicesTileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(servicesPageRoute)
  ]
})
export class ServicesPageModule { }
