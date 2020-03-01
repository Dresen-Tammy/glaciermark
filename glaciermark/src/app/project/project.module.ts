import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { Routes, RouterModule } from '@angular/router';

const projectRoute: Routes = [
  { path: 'project/:id', component: ProjectComponent }
];

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(projectRoute)
  ],
  exports: [RouterModule]
})
export class ProjectModule { }
