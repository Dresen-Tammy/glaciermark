import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { ParallaxDirective } from './directives/parallax.directive';

@NgModule({
  declarations: [
    ContactFormComponent,
    CallToActionComponent,
    ParallaxDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ContactFormComponent,
    CallToActionComponent,
    ParallaxDirective
  ]
})
export class SharedModule { }
