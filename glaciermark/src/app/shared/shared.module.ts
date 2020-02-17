import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from './section-header/section-header.component';

@NgModule({
  declarations: [SectionHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SectionHeaderComponent
  ]
})
export class SharedModule { }
