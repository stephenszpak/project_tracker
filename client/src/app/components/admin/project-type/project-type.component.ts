import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Util, ProjectTypeModel, UserModel } from '../../../shared';
import { environment } from '../../../../environments/environment';

export interface ProjectType {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
  styleUrls: ['./project-type.component.scss']
})
export class ProjectTypeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  adminRole = environment.adminRole;
  userRole = environment.userRole;
  projectTypes: ProjectType[];
  projectType: ProjectTypeModel;
  loading: boolean = false;
  dataSource: MatTableDataSource<ProjectType>;

  displayedColumns = ['id', 'name', 'actions']

  constructor(
    private snackBar: MatSnackBar
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.loadProjectTypes();
  }

  async loadProjectTypes() {
    this.loading = true;

    this.projectTypes = await ProjectTypeModel.getAllProjectTypes();

    this.dataSource = new MatTableDataSource(this.projectTypes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  async onDelete(id: string) {
    let remove = await Util.openRemoveDialog({ data: { title: 'Warning!', body: 'Are you sure you want to delete this projectTypes?' } });
    this.projectType = await ProjectTypeModel.getById(id);
    if (remove) {
      let err, res;
      [err, res] = await Util.to(this.projectType.removeProjectType());
      if (err) {
        return;
      }
      this.loadProjectTypes();
      this.snackBar.open('ProjectType', 'Deleted', { duration: 2000 });
      setTimeout(() => { ProjectTypeModel.to('projectTypes'); }, 1000);
    }
  }

}
