import { AppInjector } from '../../app.module';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { MatDialog } from '@angular/material';
import { DialogRemoveComponent } from '../dialogs/dialog-remove/dialog-remove.component';

export class Util {
  constructor(
    private snackBar: MatSnackBar
  ) { }

  static get router() {
    return AppInjector.get(Router);
  }

  static get http() {
    return AppInjector.get(Http);
  }

  static get dialog() {
    return AppInjector.get(MatDialog);
  }


  static async openRemoveDialog(config?: any) {
    let nconfig = {}
    nconfig['width'] = (!config || !config.width) ? '300px' : config.width;
    nconfig['height'] = (!config || !config.height) ? '300px' : config.height;
    nconfig['data'] = (!config || !config.data) ? { 'title': 'Warning', 'body': 'Are you sure you want to delete this?' } : config.data;

    let dialog = this.dialog.open(DialogRemoveComponent, nconfig);
    return new Promise(resolve => {
      dialog.afterClosed().subscribe(result => {
        resolve(result);
      });
    })
  }

  // NOTE: *** STATIC METHODS TO HELP WITH API ***
  static getUrlParams(route: any) {
    return new Promise(resolve => {
      route.params.subscribe(params => resolve(params));
    });
  };

  // NOTE: global function to help handle promise rejections
  static to(promise, parse?) {
    return promise.then(data => {
      return [null, data];
    }).catch(err => {
      if (parse == false) return [err];
    });
  };

  // NOTE: global error handler
  static throwErr = function(errMessage: string, log?: boolean) {
    if (log == true) {
      console.error(errMessage);
    }
    throw new Error(errMessage);
  };

  // NOTE: global success message?
  static successMsg = function(successMessage: string) {
    this.snackBar.open(successMessage, "", {
      duration: 2000,
      panelClass: ['sb-success'],
      verticalPosition: "top"
    });
  }

  static route(uri) {
    this.router.navigate([uri]);
  };

  static getApiUrl() {
    return environment.apiUrl;
  };

  static apiHeaders(headers: any) {
    headers.append('Content-Type', 'application/json');
    let user: UserModel = <UserModel>UserModel.Auth();
    if (user) {
      let token: string = user.token;
      headers.append('Authorization', token);
    }
    return headers;
  };

  static responder(err, res) {
    let send;
    if (err) send = err;
    if (res) send = res;
    return JSON.parse(send._body);
  };


  // API POST
  static async post(url, data) {
    var headers = new Headers();
    if (url[0] == '/') {
      url = this.getApiUrl() + url;
      headers = this.apiHeaders(headers);
    }

    let err, res;
    [err, res] = await this.to(this.http.post(url, data, { headers: headers }).toPromise(), false);
    return this.responder(err, res);
  };

  // API PUT
  static async put(url, data) {
    var headers = new Headers();
    if (url[0] == '/') {
      url = this.getApiUrl() + url;
      headers = this.apiHeaders(headers);
    }

    let err, res;
    [err, res] = await this.to(this.http.put(url, data, { headers: headers }).toPromise(), false);
    return this.responder(err, res);
  };

  // API PATCH (prob wont use but might as well have it)
  static async patch(url, data) {
    var headers = new Headers();
    if (url[0] == '/') {
      url = this.getApiUrl() + url;
      headers = this.apiHeaders(headers);
    }

    let err, res;
    [err, res] = await this.to(this.http.patch(url, data, { headers: headers }).toPromise(), false);
    return this.responder(err, res);
  };

  // API DELETE
  static async delete(url) {
    var headers = new Headers();
    if (url[0] == '/') {
      url = this.getApiUrl() + url;
      headers = this.apiHeaders(headers);
    }

    let err, res;
    [err, res] = await this.to(this.http.delete(url, { headers: headers }).toPromise(), false);
    return this.responder(err, res);
  };

  // API GET
  static async get(url) {
    var headers = new Headers();
    if (url[0] == '/') {
      url = this.getApiUrl() + url;
      headers = this.apiHeaders(headers);
    }

    let err, res;
    [err, res] = await this.to(this.http.get(url, { headers: headers }).toPromise(), false);
    return this.responder(err, res);
  };

  static capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
}
