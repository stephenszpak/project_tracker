import * as _ from 'underscore';
import { Util } from './util.helper';

export class API {
  constructor() {}

  static async save(model, uri: string, updateData: any) {
    let err, res: any;

    // if(!updateData) {
    //   let differences = model.instanceDifferences();
    //   if (_.isEmpty(differences)) Util.throwErr('Nothing Updated');
    // 
    //   updateData = _.pick(differences, (value, key, object) => model.apiUpdateValues.includes(key));
    //   if (_.isEmpty(updateData)) Util.throwErr('Nothing Updated');
    // }

    [err, res] = await Util.to(Util.put(uri, updateData));

    if (err) Util.throwErr(err, true);
    if (!res.success) Util.throwErr(res.error, true);

    model.emit('saveAPI', updateData, true);
    model.save();
    return true;
  }

  static async remove(model, uri: string) {
    let err, res: any;

    [err, res] = await Util.to(Util.delete(uri));

    if (err) Util.throwErr(err, true);

    model.emit('removeApi', {}, true);
    model.remove();
    return true;
  }
}
