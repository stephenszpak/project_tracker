import { User } from './user.interface';
export interface LoginInfo {
  token?: string,
  auth_info?: Object,
  user?: User,
  id?: string,
}
