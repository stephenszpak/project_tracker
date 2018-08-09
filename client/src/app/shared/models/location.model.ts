import { Model } from 'browser-model';

import { API } from '../helpers/api.helper';
import { Util } from '../helpers/util.helper';

export class LocationModel extends Model {
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
    return Util.route('/locations/' + action + '/' + this.id);
  }

  async saveAPI(info: any) {
    return API.save(this, '/api/locations/' + this.id, info);
  }

  // NOTE: ADMIN ONLY
  async removeLocation() {
    return API.remove(this, '/api/locations/' + this.id);
  }

  static to(action) {
    return Util.route(action);
  }

  static async getAllLocations() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/locations'));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let locations = []
    for (let i in res.locations) {
      let locationInfo = res.locations[i];
      let location = this.resCreate(locationInfo);
      locations.push(location);
    }
    // console.log('locations in model: ', locations)
    return locations;
  }

  static async getAPI() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/locations'))
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let location
  }

  static resCreate(resLocation) {//create location instance from a location response
    let location = this.findById(resLocation.id);
    if (location) return location;
    let locationInfo = resLocation;
    locationInfo.id = resLocation.id;

    location = this.create(locationInfo);
    return location;
  }

  // NOTE: ADMIN ONLY
  static async CreateAPI(locationInfo: any) {
    let err, res;
    [err, res] = await Util.to(Util.post('/api/locations', locationInfo));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);
    let location = this.resCreate(res.location);
    console.log('created location', location)
    location.emit(['newly-created'], locationInfo, true);
    return location;
  }

  static async getById(id: string) {
    let location = this.findById(id);
    if (location) return location;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/api/locations/' + id));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let locationInfo = res.location;
    location = this.resCreate(res.location);
    console.log('get by id location: ', location)
    return location;
  }
}
