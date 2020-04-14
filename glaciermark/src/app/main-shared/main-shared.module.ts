import { SectionHeaderComponent } from './section-header/section-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    SectionHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SectionHeaderComponent
  ]
})
export class MainSharedModule { }
