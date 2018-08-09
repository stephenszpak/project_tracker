const { User } = require('../models');
const CONFIG = require('../config/config');
const { to, ReE, ReS } = require('../services/util.service');
const authService = require('../services/auth.service');

const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;
  if (!body.unique_key && !body.email) {
    return ReE(res, 'Please enter an email to register!');
  } else if (!body.password) {
    return ReE(res, 'Please enter a password to register!');
  } else {
    let err, user;

    [err, user] = await to(authService.createUser(body));
    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created a new user!', user: user.toWeb(), token: user.getJWT() }, 201);

  };
};
module.exports.create = create;

const login = async function(req, res) {
  const body = req.body;
  let err, user;

  [err, user] = await to(authService.authUser(req.body));
  if (err) return ReE(res, err, 422);

  return ReS(res, { message: 'Successfully logged in with JWT!', user: user.toWeb(), token: user.getJWT() });
}
module.exports.login = login;

const get = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let user = req.user;

  return ReS(res, { user: user.toWeb() });
}
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let user = req.body;
  let err, users;
  [err, users] = await to(User.find({ user: user.id }))
  if (err) ReE(err, 'err getting users');

  let userJson = [];
  for (let i in users) {
    let userList = users[i];
    userJson.push(userList.toWeb())
  }
  return ReS(res, { users: userJson });
}
module.exports.getAll = getAll;

// NOTE: MIDDLEWARE GET BY ID FUNCTION THEN next() TO USE FOR DELETE AND OTHER FUNCTIONS
const getById = async function(req, res, next) {
  let userId, err, user;
  let body = req.body;
  userId = req.params.userId;

  [err, user] = await to(User.findOne({ _id: userId }));
  if (err) return ReE(res, "Error finding user.");

  if (!user) return ReE(res, "Project not found with Id: " + userId);

  req.user = user;
  next();
};
module.exports.getById = getById;
