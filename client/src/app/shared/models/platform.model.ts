import { Model } from 'browser-model';

import { API } from '../helpers/api.helper';
import { Util } from '../helpers/util.helper';

export class PlatformModel extends Model {
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
    return Util.route('/platforms/' + action + '/' + this.id);
  }

  async saveAPI(info: any) {
    return API.save(this, '/api/platforms/' + this.id, info);
  }

  async removePlatform() {
    return API.remove(this, '/api/platforms/' + this.id);
  }

  static to(action) {
    return Util.route(action);
  }

  static async getAllPlatforms() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/platforms'));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let platforms = []
    for (let i in res.platforms) {
      let platformInfo = res.platforms[i];
      let platform = this.resCreate(platformInfo);
      platforms.push(platform);
    }
    // console.log('platforms in model: ', platforms)
    return platforms;
  }

  static async getAPI() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/platforms'))
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let platform
  }

  static resCreate(resPlatform) {//create platform instance from a platform response
    let platform = this.findById(resPlatform.id);
    if (platform) return platform;
    let platformInfo = resPlatform;
    platformInfo.id = resPlatform.id;

    platform = this.create(platformInfo);
    return platform;
  }

  // NOTE: ADMIN ONLY
  static async CreateAPI(platformInfo: any) {
    let err, res;
    [err, res] = await Util.to(Util.post('/api/platforms', platformInfo));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);
    let platform = this.resCreate(res.platform);
    console.log('created platform', platform)
    platform.emit(['newly-created'], platformInfo, true);
    return platform;
  }

  static async getById(id: string) {
    let platform = this.findById(id);
    if (platform) return platform;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/api/platforms/' + id));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let platformInfo = res.platform;
    platform = this.resCreate(res.platform);
    console.log('get by id platform: ', platform)
    return platform;
  }
}
