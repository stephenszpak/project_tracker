import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { Util } from '../helpers/util.helper';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiGuard implements CanActivate {
  constructor(
    private notify: ToastrService
  ){}
  canActivate(): boolean {
    if(UserModel.Auth()){
      return true;
    }else{
      this.notify.error('You must be logged in')
      Util.route('/login');
      return false;
    }
  }
}
