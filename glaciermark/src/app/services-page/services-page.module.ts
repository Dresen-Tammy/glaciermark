import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesPageComponent } from './services-page.component';
import { ServicesHeaderComponent } from './services-section/services-header/services-header.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { ServicesTileComponent } from './services-section/services-list/services-tile/services-tile.component';
import { ServicesListComponent } from './services-section/services-list/services-list.component';

const servicesPageRoute: Routes = [
  { path: 'services', component: ServicesPageComponent}
]

@NgModule({
  declarations: [
    ServicesPageComponent,
    ServicesHeaderComponent,
    ServicesSectionComponent,
    ServicesTileComponent,
    ServicesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(servicesPageRoute)
  ]
})
export class ServicesPageModule { }
