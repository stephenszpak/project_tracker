import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Util, AudienceModel } from "../../../../shared";
import { MatSnackBar } from '@angular/material';
import { FormControlErrors } from '../../../../shared/errors';

export interface Audience {
  id: string,
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-audience',
  templateUrl: './create-audience.component.html',
  styleUrls: ['./create-audience.component.scss']
})
export class CreateAudienceComponent implements OnInit {
  @ViewChild('input') private focus: ElementRef;

  audience: Audience = <Audience>{};
  audienceForm: FormGroup;
  loading: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.audienceForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.focus.nativeElement.focus();
  }

  async onSubmit() {
    this.audience = this.prepareForm();

    let err, audience;
    [err, audience] = await Util.to(AudienceModel.CreateAPI(this.audience));
    if (!err) this.snackBar.open('Audience Created', '', { duration: 2000, panelClass: ['sb-success'] });

    setTimeout(() => { AudienceModel.to('audiences') }, 2000);

  }

  prepareForm(): Audience {
    const formValues = this.audienceForm.value;
    const saveForm: any = {
      name: formValues.name,
      description: formValues.description
    }
    return saveForm;
  }

  matcher = new FormControlErrors();

}
