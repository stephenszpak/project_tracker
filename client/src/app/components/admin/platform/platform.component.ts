import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Util, PlatformModel, UserModel } from '../../../shared';
import { environment } from '../../../../environments/environment';

export interface Platform {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  adminRole = environment.adminRole;
  userRole = environment.userRole;
  platforms: Platform[];
  platform: PlatformModel;
  loading: boolean = false;
  dataSource: MatTableDataSource<Platform>;

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
    this.loadPlatforms();
  }

  async loadPlatforms() {
    this.loading = true;

    this.platforms = await PlatformModel.getAllPlatforms();

    this.dataSource = new MatTableDataSource(this.platforms);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  async onDelete(id: string) {
    let remove = await Util.openRemoveDialog({ data: { title: 'Warning!', body: 'Are you sure you want to delete this platforms?' } });
    this.platform = await PlatformModel.getById(id);
    if (remove) {
      let err, res;
      [err, res] = await Util.to(this.platform.removePlatform());
      if (err) {
        return;
      }
      this.loadPlatforms();
      this.snackBar.open('Platform', 'Deleted', { duration: 2000 });
      setTimeout(() => { PlatformModel.to('platforms'); }, 1000);
    }
  }

}
