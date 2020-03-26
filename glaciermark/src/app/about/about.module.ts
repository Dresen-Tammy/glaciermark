import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { AboutComponent } from './about.component';
import { Routes, RouterModule } from '@angular/router';
import { TeamMemberComponent } from './team-member/team-member.component';

const aboutRoute: Routes = [
  { 
    path: '',
    children: [
      {
        path: '',
        component: AboutComponent 
      } 
    ]
  }
];

@NgModule({
  declarations: [
    AboutComponent, 
    TeamMemberComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(aboutRoute)
  ],
  exports: [RouterModule]
})
export class AboutModule { }
