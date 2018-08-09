import { Model } from 'browser-model';

import { API } from '../helpers/api.helper';
import { Util } from '../helpers/util.helper';

export class AudienceModel extends Model {
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
    return Util.route('/audiences/' + action + '/' + this.id);
  }

  // TODO:this SHOULD be the update function, not working, why?
  // NOTE: -- possible async problem
  async saveAPI(info: any) {
    return API.save(this, '/api/audiences/' + this.id, info);
  }


  // NOTE: ADMIN ONLY
  async removeAudience() {
    return API.remove(this, '/api/audiences/' + this.id);
  }

  static to(action) {
    return Util.route(action);
  }

  static async getAllAudiences() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/audiences'));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let audiences = []
    for (let i in res.audiences) {
      let audienceInfo = res.audiences[i];
      let audience = this.resCreate(audienceInfo);
      audiences.push(audience);
    }
    // console.log('audiences in model: ', audiences)
    return audiences;
  }

  static async getAPI() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/audiences'))
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let audience;
  }

  static resCreate(resAudience) {//create audience instance from a audience response
    let audience = this.findById(resAudience.id);
    if (audience) return audience;
    let audienceInfo = resAudience;
    audienceInfo.id = resAudience.id;

    audience = this.create(audienceInfo);
    return audience;
  }

  // NOTE: ADMIN ONLY
  static async CreateAPI(audienceInfo: any) {
    let err, res;
    [err, res] = await Util.to(Util.post('/api/audiences', audienceInfo));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);
    let audience = this.resCreate(res.audience);
    console.log('created audience', audience)
    audience.emit(['newly-created'], audienceInfo, true);
    return audience;
  }

  static async getById(id: string) {
    let audience = this.findById(id);
    if (audience) return audience;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/api/audiences/' + id));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let audienceInfo = res.audience;
    audience = this.resCreate(res.audience);
    console.log('get by id audience: ', audience)
    return audience;
  }
}
