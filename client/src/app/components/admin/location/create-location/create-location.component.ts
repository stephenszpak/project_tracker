import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Util, LocationModel } from "../../../../shared";
import { MatSnackBar } from '@angular/material';
import { FormControlErrors } from '../../../../shared/errors';
import { environment } from '../../../../../environments/environment';

export interface Location {
  id: string,
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  @ViewChild('input') private focus: ElementRef;

  location: Location = <Location>{};
  locationForm: FormGroup;
  loading: boolean = false;
  adminRole = environment.adminRole;

  constructor(
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
    this.focus.nativeElement.focus();

  }

  async onSubmit() {
    this.location = this.prepareForm();

    let err, location;
    [err, location] = await Util.to(LocationModel.CreateAPI(this.location));
    if (!err) this.snackBar.open('Location', 'Created', { duration: 2000, panelClass: ['sb-success'] });

    setTimeout(() => { LocationModel.to('locations'); this.loading = true; }, 2000);

  }

  prepareForm(): Location {
    const formValues = this.locationForm.value;
    const saveForm: any = {
      name: formValues.name,
      description: formValues.description
    }
    return saveForm;
  }

  matcher = new FormControlErrors();

}
