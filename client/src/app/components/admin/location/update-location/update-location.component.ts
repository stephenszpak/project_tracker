import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Util, LocationModel, UserModel } from "../../../../shared";
import { MatSnackBar } from '@angular/material';
import { FormControlErrors } from '../../../../shared/errors';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

export interface Location {
  id: string,
  name: string;
  description: string;
}

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.scss']
})
export class UpdateLocationComponent implements OnInit {
  location: Location = <Location>{};
  locationForm: FormGroup;
  url_params;
  adminRole = environment.adminRole;

  constructor(
    private aRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.locationForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadExistingLocation();
  }

  async loadExistingLocation() {
    this.url_params = await Util.getUrlParams(this.aRoute);
    this.location = await LocationModel.findById(this.url_params.id)
    console.log('loaded location: ', this.location);

    this.locationForm = this.fb.group({
      name: this.location.name,
      description: this.location.description
    });
  }
  matcher = new FormControlErrors();
}
