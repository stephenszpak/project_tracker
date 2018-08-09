import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Util, ProjectModel, UserModel } from '../../shared';
import { ViewProjectComponent } from './view-project/view-project.component';
import { environment } from '../../../environments/environment';

export interface Projects {
  id: string,
  name: string;
  description: string;
  projectSponsor: string;
  executiveSponsor: string;
  productSponsor: string;
  projectType: string;
  locationsImpacted: string;
  audiencesImpacted: string;
  platformsImpacted: string;
  newPricingRules: string;
  volume: number;
  revenueAtList: number;
  dealFormEligible: string;
  newTitles: string;
  newAccounts: string;
  projectDetails: string;
  businessCase: string;
  comments: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  adminRole = environment.adminRole;
  userRole = environment.userRole;
  projects: Array<ProjectModel> = [];
  user: UserModel;
  loading: boolean = false;
  project: ProjectModel;
  currentRole: string;
  dataSource: MatTableDataSource<Projects>;
  displayedColumns = ['id', 'datecreated', 'name', 'projectsponsor', 'actions']

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ngOnInit() {
    this.loadProjects();
    this.currentRole = this.getUsersRole();
  }

  getUsersRole() {
    this.user = UserModel.Auth();
    return this.user.roles;
  }

  async loadProjects() {
    this.loading = true;
    this.projects = await ProjectModel.getAllProjects();
    this.dataSource = new MatTableDataSource(this.projects);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
    // setTimeout(() => {  }, 100);
  }

  async onDelete(id: string) {
    let remove = await Util.openRemoveDialog({ data: { title: 'Warning!', body: 'Are you sure you want to delete this project?' } });
    this.project = await ProjectModel.getById(id);
    if (remove) {
      let err, res;
      [err, res] = await Util.to(this.project.removeProject());
      if (err) {
        console.log(err, 'err')
        return;
      }
      this.loadProjects();
      this.snackBar.open('Project', 'Deleted', { duration: 2000 });
      setTimeout(() => { ProjectModel.to('projects'); }, 1000);
    }
  }
}
