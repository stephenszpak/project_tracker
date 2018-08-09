import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  currentUser: UserModel;

  ngOnInit() {
    this.currentUser = UserModel.Auth();
    UserModel.on(['auth', 'saveApi'], (auth_state) => { // data will be different depending on which event was emitted
      console.log('user has:', auth_state);
      this.currentUser = UserModel.Auth();
      // we can dynamically make the view check on certain events. For large apps this is very efficient
    });
  }

  logout() {
    if (UserModel.Auth()) this.currentUser.logout();
  }
}
