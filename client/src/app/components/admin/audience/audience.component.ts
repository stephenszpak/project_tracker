import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Util, AudienceModel, UserModel } from '../../../shared';
import { environment } from '../../../../environments/environment';

export interface Audience {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.scss']
})
export class AudienceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  adminRole = environment.adminRole;
  userRole = environment.userRole;
  audiences: Audience[];
  audience: AudienceModel;
  loading: boolean = false;
  dataSource: MatTableDataSource<Audience>;

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
    this.loadAudiences();
  }

  async loadAudiences() {
    this.loading = true;

    this.audiences = await AudienceModel.getAllAudiences();

    this.dataSource = new MatTableDataSource(this.audiences);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  async onDelete(id: string) {
    let remove = await Util.openRemoveDialog({ data: { title: 'Warning!', body: 'Are you sure you want to delete this audiences?' } });
    this.audience = await AudienceModel.getById(id);
    if (remove) {
      let err, res;
      [err, res] = await Util.to(this.audience.removeAudience());
      if (err) {
        console.log(err, 'err')
        return;
      }
      this.loadAudiences();
      this.snackBar.open('Audience', 'Deleted', { duration: 2000 });
      setTimeout(() => { AudienceModel.to('audiences'); }, 1000);
    }
  }
}
