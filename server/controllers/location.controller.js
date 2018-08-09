const { Location } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, location;
  let locationInfo = req.body;

  [err, location] = await to(Location.create(locationInfo));
  if (err) return ReE(res, err, 422);

  return ReS(res, { location: location.toWeb() }, 201);
};
module.exports.create = create;

// NOTE: MIDDLEWARE GET BY ID FUNCTION THEN next() TO USE FOR DELETE AND OTHER FUNCTIONS
const getById = async function(req, res, next) {
  let locationId, err, location;
  let body = req.body;
  locationId = req.params.locationId;

  [err, location] = await to(Location.findOne({ _id: locationId }));
  if (err) return ReE(res, "Error finding location.");

  if (!location) return ReE(res, "Location not found with Id: " + locationId);

  req.location = location;
  next();
};
module.exports.getById = getById;

const get = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let location = req.location;
  return ReS(res, { location: location.toWeb() });
}
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let location = req.body;
  let err, locations;
  [err, locations] = await to(Location.find({ location: location.id }))
  if (err) ReE(err, 'err getting locations');

  let locationJson = [];
  for (let i in locations) {
    let locationList = locations[i];
    locationJson.push(locationList.toWeb())
  }
  return ReS(res, { locations: locationJson });
}
module.exports.getAll = getAll;

const update = async function(req, res) {
  let err, location, data;
  location = req.location;
  data = req.body;
  location.set(data);

  [err, location] = await to(location.save());
  if (err) {
    return ReE(res, err);
  }
  return ReS(res, { location: location.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
  let location, err;
  location = req.location;

  [err, location] = await to(location.remove());
  if (err) return ReE(res, 'error occured trying to delete the location');

  return ReS(res, { message: 'Deleted Location' }, 204);
}
module.exports.remove = remove;
