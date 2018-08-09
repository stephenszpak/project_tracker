const { User } = require('../models');
const validator = require('validator');
const { to, throwErr } = require('../services/util.service');

// NOTE: This isn't necessary at the moment but is still used just
//       for easy implementation being able to log in with email or username
const getUniqueKeyFromBody = function(body) {
  let unique_key = body.unique_key;
  if (typeof unique_key === 'undefined') {
    if (typeof body.email != 'undefined') {
      unique_key = body.email
    } else {
      unique_key = null;
    }
  }
  return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function(userInfo) {
  let unique_key, auth_info, err;

  auth_info = {}
  auth_info.status = 'create';

  unique_key = getUniqueKeyFromBody(userInfo);
  if (!unique_key) throwErr('An email address was not entered.');

  if (validator.isEmail(unique_key)) {
    auth_info.method = 'email';
    userInfo.email = unique_key;
    // let err, user;
    [err, user] = await to(User.create(userInfo));
    if (err) throwErr('User already exists with that email ' + err);

    return user;
  } else {
    throwErr('A valid email was not entered.');
  }
}
module.exports.createUser = createUser;

const authUser = async function(userInfo) { //returns token
  let unique_key;
  let auth_info = {};
  auth_info.status = 'login';
  unique_key = getUniqueKeyFromBody(userInfo);

  if (!unique_key) throwErr('Please enter an email or phone number to login');

  if (!userInfo.password) throwErr('Please enter a password to login');

  let user;
  if (validator.isEmail(unique_key)) {
    auth_info.method = 'email';

    [err, user] = await to(User.findOne({
      email: unique_key
    }));
    if (err) throwErr(err.message);

  } else {
    throwErr('A valid email or phone number was not entered');
  }

  if (!user) throwErr('Not registered');

  [err, user] = await to(user.comparePassword(userInfo.password));

  if (err) throwErr(err.message);

  return user;

}
module.exports.authUser = authUser;
