const { Audience } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, audience;
  let audienceInfo = req.body;

  [err, audience] = await to(Audience.create(audienceInfo));
  if (err) return ReE(res, err, 422);

  return ReS(res, { audience: audience.toWeb() }, 201);
};
module.exports.create = create;

// NOTE: MIDDLEWARE GET BY ID FUNCTION THEN next() TO USE FOR DELETE AND OTHER FUNCTIONS
const getById = async function(req, res, next) {
  let audienceId, err, audience;
  let body = req.body;
  audienceId = req.params.audienceId;

  [err, audience] = await to(Audience.findOne({ _id: audienceId }));
  if (err) return ReE(res, "Error finding audience.");

  if (!audience) return ReE(res, "Audience not found with Id: " + audienceId);

  req.audience = audience;
  next();
};
module.exports.getById = getById;

const get = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let audience = req.audience;
  return ReS(res, { audience: audience.toWeb() });
}
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let audience = req.body;
  let err, audiences;
  [err, audiences] = await to(Audience.find({ audience: audience.id }))
  if (err) ReE(err, 'err getting audiences');

  let audienceJson = [];
  for (let i in audiences) {
    let audienceList = audiences[i];
    audienceJson.push(audienceList.toWeb())
  }
  return ReS(res, { audiences: audienceJson });
}
module.exports.getAll = getAll;

const update = async function(req, res) {
  let err, audience, data;
  audience = req.audience;
  data = req.body;
  audience.set(data);

  [err, audience] = await to(audience.save());
  if (err) {
    return ReE(res, err);
  }
  return ReS(res, { audience: audience.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
  let audience, err;
  audience = req.audience;

  [err, audience] = await to(audience.remove());
  if (err) return ReE(res, 'error occured trying to delete the audience');

  return ReS(res, { message: 'Deleted Audience' }, 204);
}
module.exports.remove = remove;
