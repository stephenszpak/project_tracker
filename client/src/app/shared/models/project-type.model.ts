import { Model } from 'browser-model';

import { API } from '../helpers/api.helper';
import { Util } from '../helpers/util.helper';

export class ProjectTypeModel extends Model {
  apiUpdateValues: Array<string> = ['name', 'description'];

  id;
  name;
  description;

  static SCHEMA = {
    id: { type: 'string', primary: true },
    name: { type: 'string' },
    description: { type: 'string' }
  };

  constructor(obj: object) {
    super(obj);
  }

  to(action) {
    return Util.route('/types/' + action + '/' + this.id);
  }

  async saveAPI(info: any) {
    return API.save(this, '/api/types/' + this.id, info);
  }

  // NOTE: ADMIN ONLY
  async removeProjectType() {
    return API.remove(this, '/api/types/' + this.id);
  }

  static to(action) {
    return Util.route(action);
  }

  static async getAllProjectTypes() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/types'));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let projectTypes = []
    for (let i in res.projectTypes) {
      let projectTypeInfo = res.projectTypes[i];
      let projectType = this.resCreate(projectTypeInfo);
      projectTypes.push(projectType);
    }
    // console.log('projectTypes in model: ', projectTypes)
    return projectTypes;
  }

  static async getAPI() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/projectTypes'))
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let projectType
  }

  static resCreate(resProjectType) {//create projectType instance from a projectType response
    let projectType = this.findById(resProjectType.id);
    if (projectType) return projectType;
    let projectTypeInfo = resProjectType;
    projectTypeInfo.id = resProjectType.id;

    projectType = this.create(projectTypeInfo);
    return projectType;
  }

  // NOTE: ADMIN ONLY
  static async CreateAPI(projectTypeInfo: any) {
    let err, res;
    [err, res] = await Util.to(Util.post('/api/projectTypes', projectTypeInfo));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);
    let projectType = this.resCreate(res.projectType);
    console.log('created projectType', projectType)
    projectType.emit(['newly-created'], projectTypeInfo, true);
    return projectType;
  }

  static async getById(id: string) {
    let projectType = this.findById(id);
    if (projectType) return projectType;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/api/projectTypes/' + id));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let projectTypeInfo = res.projectType;
    projectType = this.resCreate(res.projectType);
    console.log('get by id projectType: ', projectType)
    return projectType;
  }
}
