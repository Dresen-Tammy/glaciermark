import { MainSharedModule } from './../main-shared/main-shared.module';
import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';

const contactRoute: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ContactComponent
      }
    ]
  }
];

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(contactRoute),
    SharedModule,
    MainSharedModule
  ],
  exports: [RouterModule]
})
export class ContactModule { }
