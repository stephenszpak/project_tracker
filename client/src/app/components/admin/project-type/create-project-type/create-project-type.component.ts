import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Util, ProjectTypeModel } from "../../../../shared";
import { MatSnackBar } from '@angular/material';
import { FormControlErrors } from '../../../../shared/errors';
import { environment } from '../../../../../environments/environment';

export interface ProjectType {
  id: string,
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-project-type',
  templateUrl: './create-project-type.component.html',
  styleUrls: ['./create-project-type.component.scss']
})
export class CreateProjectTypeComponent implements OnInit {
  @ViewChild('input') private focus: ElementRef;

  projectType: ProjectType = <ProjectType>{};
  projectTypeForm: FormGroup;
  loading: boolean = false;
  adminRole = environment.adminRole;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.projectTypeForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.focus.nativeElement.focus();
  }

  async onSubmit() {
    this.projectType = this.prepareForm();

    let err, projectType;
    [err, projectType] = await Util.to(ProjectTypeModel.CreateAPI(this.projectType));
    if (!err) this.snackBar.open('ProjectType Created', '', { duration: 2000, panelClass: ['sb-success'] });

    setTimeout(() => { ProjectTypeModel.to('projectTypes'); this.loading = true; }, 2000);

  }

  prepareForm(): ProjectType {
    const formValues = this.projectTypeForm.value;
    const saveForm: any = {
      name: formValues.name,
      description: formValues.description
    }
    return saveForm;
  }

  matcher = new FormControlErrors();

}
