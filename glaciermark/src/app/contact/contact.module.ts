import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';

const contactRoute: Routes = [
  { path: 'contact', component: ContactComponent }
]

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(contactRoute)
  ],
  exports: [RouterModule]
})
export class ContactModule { }
