import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Util, LocationModel, UserModel } from '../../../shared';
import { environment } from '../../../../environments/environment';

export interface Location {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  adminRole = environment.adminRole;
  userRole = environment.userRole;
  locations: Location[];
  location: LocationModel;
  loading: boolean = false;
  dataSource: MatTableDataSource<Location>;

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
    this.loadLocations();
  }

  async loadLocations() {
    this.loading = true;

    this.locations = await LocationModel.getAllLocations();

    this.dataSource = new MatTableDataSource(this.locations);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  async onDelete(id: string) {
    let remove = await Util.openRemoveDialog({ data: { title: 'Warning!', body: 'Are you sure you want to delete this locations?' } });
    this.location = await LocationModel.getById(id);
    if (remove) {
      let err, res;
      [err, res] = await Util.to(this.location.removeLocation());
      if (err) {
        return;
      }
      this.loadLocations();
      this.snackBar.open('Location', 'Deleted', { duration: 2000 });
      setTimeout(() => { LocationModel.to('locations'); }, 1000);
    }
  }

}
