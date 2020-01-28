import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {

  public productId = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
