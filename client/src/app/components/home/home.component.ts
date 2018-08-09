import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Util, ProjectModel, UserModel } from '../../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  users: Array<UserModel> = [];
  dateNow: Date;
  projects: Array<ProjectModel> = [];
  oneMonth: Date;

  constructor() { }

  async ngOnInit() {
    this.projects = await ProjectModel.getAllProjects();

    this.projects.sort((a, b) => { return (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0) });
  }

}
