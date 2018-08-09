import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserModel, Util } from "../../shared";
import { MatSnackBar } from "@angular/material";
import { FormControlErrors } from '../../shared/errors';
import { ToastrService } from 'ngx-toastr';

export interface UserLoginInfo {
  email: string,
  password: string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  userInfo: UserLoginInfo = <UserLoginInfo>{};
  loginForm: FormGroup;
  user: any;
  hide: boolean = true;
  error = '';
  constructor(
    private snackBar: MatSnackBar,
    private notify: ToastrService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    this.userInfo = this.prepareForm();
    this.login(this.userInfo);
  }

  async login(data: Object) {
    var err;
    [err, this.user] = await Util.to(UserModel.LoginReg(data));
    if (err) this.notify.error(Util.throwErr(err.message));

    if (!err) this.snackBar.open('Login Successful', '', { duration: 2000, panelClass: ['sb-success'] });
    return this.user.to('home');
  }

  prepareForm(): UserLoginInfo {
    const formValues = this.loginForm.value;
    const saveForm: any = {
      email: formValues.email,
      password: formValues.password
    }
    return saveForm;
  }

  handleError(errorException) {
    this.error = "Error occured: " + errorException;
    this.notify.error(errorException);
  }

  matcher = new FormControlErrors();
}
