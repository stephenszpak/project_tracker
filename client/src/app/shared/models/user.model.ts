import { AppInjector } from '../../app.module';
import { Model } from 'browser-model';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import * as jwt_decode from 'jwt-decode';

import { LoginInfo } from '../interfaces/login-info.interface';

import { Util } from '../helpers/util.helper';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';

export class UserModel extends Model {
  apiUpdateValues: Array<string> = ['email', 'firstName', 'lastName', 'roles'];
  jwtHelper: JwtHelper = new JwtHelper();

  id;
  firstName;
  lastName;
  auth;
  token;
  email;
  roles;

  static get permissionsService() {
    return AppInjector.get(NgxPermissionsService);
  }

  decodeJwtToken() {
    var token = localStorage.getItem('userAuthToken');
    return this.jwtHelper.decodeToken(token);
  }
  useJwtHelper() {
    var token = localStorage.getItem('userAuthToken');
    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  }

  static SCHEMA = {
    id: { type: 'string', primary: true },//this means every time you make a new object you must give it a _id
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    roles: { type: 'string' },
    auth: { type: 'boolean' },
    token: { type: 'string' },
  };

  constructor(obj: object) {
    super(obj);
  }


  static get fb(){
    // return Util.fb;
    return {};
  }

  logout() {
    this.remove();
    localStorage.clear();
    localStorage.removeItem('ProjectModel');
    localStorage.removeItem('TaskModel');
    localStorage.removeItem('UserModel');
    Util.route('/login');
    this.emit(['logout', 'auth'], 'logout', true);
  }

  // async saveAPI() {
  //   return API.save(this, '/api/users');
  // }

  to(action) {
    return Util.route(action);
  }

  parseToken() {
    return jwt_decode(this.token);
  }

  // NOTE: static methods
  // TODO: FIX MULTIPLE LOADS
  static Auth() {//Grabs currently authenticated user
    let user: UserModel = <UserModel>this.findOne({ auth: true });
    if (user) {
      this.permissionsService.loadPermissions(user.roles);

      let parse = user.parseToken();
      // console.log('decoded jwt', parse);
      let currentDate = new Date();
      let currentTime = currentDate.getTime() / 1000;

      if (currentTime >= parse.exp) {//get the users token expiration time; if it's up then log them out
        user.logout();
        this.permissionsService.flushPermissions();
        return null;
      }
    }
    return user;
  }

  static getCurrentUser() {
    let user: UserModel = <UserModel>this.findOne({ auth: true });
    return user;
  }

  static flushPermissions() {
    this.permissionsService.flushPermissions();
  }

  static Login(info: LoginInfo) {
    let userInfo: any = info.user;
    userInfo.auth = true;
    userInfo.token = info.token;

    let user = <UserModel>UserModel.create(userInfo);
    user.emit(['login', 'auth'], 'login', true);
    console.log('user login: ', user)

    return user;
  }

  static async LoginReg(data: Object) {
    let res: any;
    let err;
    [err, res] = await Util.to(Util.post('/api/users/login', data));

    if (err) Util.throwErr(err, true);

    if (!res.success) Util.throwErr(res.error, true);

    var loginInfo: LoginInfo = {
      token: res.token,
      user: res.user,
    };

    let user = this.Login(loginInfo);
    return user;
  }

  static async CreateAccount(data: Object) {
    let err, res: any;
    [err, res] = await Util.to(Util.post('/api/users/register', data));

    if (err) Util.throwErr(err, true);
    if (!res.success) Util.throwErr(res.error, true);

    var loginInfo: LoginInfo = {
      token: res.token,
      user: res.user,
    };

    let user = this.Login(loginInfo);
    return user;
  }

  static async getAllUsers() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/users'));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let users = []
    for (let i in res.users) {
      let userInfo = res.users[i];
      let user = this.resCreate(userInfo);
      users.push(user);
    }
    return users;
  }

  static resCreate(resUser) {//create user instance from a user response
    let user = this.findById(resUser.id);
    if (user) return user;
    let userInfo = resUser;
    userInfo.id = resUser.id;

    user = this.create(userInfo);
    return user;
  }

  static async getById(id: string) {
    let user = this.findById(id);
    if (user) return user;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/api/users/' + id));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let userInfo = res.user;
    user = this.resCreate(res.user);
    return user;
  }

}
