import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Util, PlatformModel } from "../../../../shared";
import { MatSnackBar } from '@angular/material';
import { FormControlErrors } from '../../../../shared/errors';
import { environment } from '../../../../../environments/environment';

export interface Platform {
  id: string,
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-platform',
  templateUrl: './create-platform.component.html',
  styleUrls: ['./create-platform.component.scss']
})
export class CreatePlatformComponent implements OnInit {
  @ViewChild('input') private focus: ElementRef;

  platform: Platform = <Platform>{};
  platformForm: FormGroup;
  loading: boolean = false;
  adminRole = environment.adminRole;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.platformForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.focus.nativeElement.focus();
  }

  async onSubmit() {
    this.platform = this.prepareForm();

    let err, platform;
    [err, platform] = await Util.to(PlatformModel.CreateAPI(this.platform));
    if (!err) this.snackBar.open('Platform Created', '', { duration: 2000, panelClass: ['sb-success'] });

    setTimeout(() => { PlatformModel.to('platforms'); this.loading = true; }, 2000);

  }

  prepareForm(): Platform {
    const formValues = this.platformForm.value;
    const saveForm: any = {
      name: formValues.name,
      description: formValues.description
    }
    return saveForm;
  }

  matcher = new FormControlErrors();

}
