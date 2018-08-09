import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserModel, Util } from "../../../shared";
import { MatSnackBar } from "@angular/material";
import { FormControlErrors } from '../../../shared/errors';
import { ToastrService } from 'ngx-toastr';

export interface UserRegisterInfo {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerInfo: UserRegisterInfo = <UserRegisterInfo>{};
  registerForm: FormGroup;
  user: any;
  hide: boolean = true;

  constructor(
    private snackBar: MatSnackBar,
    private notify: ToastrService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })
  }

  ngOnInit() {
  }

  async onSubmit() {
    this.registerInfo = this.prepareForm();

    this.register(this.registerInfo);
  }

  async register(data: Object) {
    if (this.registerInfo.confirmPassword != this.registerInfo.password) {
      this.throwInputError('confirmPassword', 'Passwords do not match');
      return
    }

    let err;
    [err, this.user] = await Util.to(UserModel.CreateAccount(data))

    if (err) Util.throwErr(err);

    this.notify.success('Registration Successful; You are now logged in');
    return this.user.to('home');
  }

  prepareForm(): UserRegisterInfo {
    const formValues = this.registerForm.value;
    const saveForm: any = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword
    }
    return saveForm;
  }
  getInputErrorMessage(inputName: string) {
    var errMessage: string = '';
    if (this.registerForm.get(inputName).hasError('required')) {
      if (inputName == 'email') errMessage = 'You must enter an Email.';
      if (inputName == 'firstName') errMessage = 'You must enter a First Name.'
      if (inputName == 'lastName') errMessage = 'You must enter a Last Name.'
      if (inputName == 'password' || inputName == 'confirmPassword') errMessage = 'You must enter a Password.';
    }
    if (this.registerForm.get(inputName).hasError('custom')) {
      errMessage = this.registerForm.get(inputName).getError('custom');
    }
    return errMessage;
  }

  throwInputError(inputName: string, message: string) {
    this.registerForm.get(inputName).setErrors({ custom: message });
  }

  matcher = new FormControlErrors();
}
