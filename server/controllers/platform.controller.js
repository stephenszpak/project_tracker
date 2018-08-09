const { Platform } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, platform;
  let platformInfo = req.body;

  [err, platform] = await to(Platform.create(platformInfo));
  if (err) return ReE(res, err, 422);

  return ReS(res, { platform: platform.toWeb() }, 201);
};
module.exports.create = create;

// NOTE: MIDDLEWARE GET BY ID FUNCTION THEN next() TO USE FOR DELETE AND OTHER FUNCTIONS
const getById = async function(req, res, next) {
  let platformId, err, platform;
  let body = req.body;
  platformId = req.params.platformId;

  [err, platform] = await to(Platform.findOne({ _id: platformId }));
  if (err) return ReE(res, "Error finding platform.");

  if (!platform) return ReE(res, "Platform not found with Id: " + platformId);

  req.platform = platform;
  next();
};
module.exports.getById = getById;

const get = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let platform = req.platform;
  return ReS(res, { platform: platform.toWeb() });
}
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let platform = req.body;
  let err, platforms;
  [err, platforms] = await to(Platform.find({ platform: platform.id }))
  if (err) ReE(err, 'err getting platforms');

  let platformJson = [];
  for (let i in platforms) {
    let platformList = platforms[i];
    platformJson.push(platformList.toWeb())
  }
  return ReS(res, { platforms: platformJson });
}
module.exports.getAll = getAll;

const update = async function(req, res) {
  let err, platform, data;
  platform = req.platform;
  data = req.body;
  platform.set(data);

  [err, platform] = await to(platform.save());
  if (err) {
    return ReE(res, err);
  }
  return ReS(res, { platform: platform.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
  let platform, err;
  platform = req.platform;

  [err, platform] = await to(platform.remove());
  if (err) return ReE(res, 'error occured trying to delete the platform');

  return ReS(res, { message: 'Deleted Platform' }, 204);
}
module.exports.remove = remove;
