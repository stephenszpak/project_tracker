const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const CONFIG = require('../config/config');
const { to, ReE, ReS } = require('../services/util.service');

let UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    index: true,
    sparse: true,
    required: [true, 'Email must not be empty!'],
    validate: [validate({
      validator: 'isEmail',
      message: 'Not a valid email!',
    })]
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  }
}, {
  timestamps: true
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    let err, salt, hash;
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) throwErr(err.message, true);

    [err, hash] = await to(bcrypt.hash(this.password, salt));
    if (err) throwErr(err.message, true);

    this.password = hash;

  } else {
    return next();
  }
})

UserSchema.methods.comparePassword = async function(pw) {
  let err, pass;
  if (!this.password) throwErr('Password not set!');

  [err, pass] = await to(bcrypt_p.compare(pw, this.password));
  if (err) throwErr(err);

  if (!pass) throwErr('Invalid Password!');

  return this;
}

UserSchema.virtual('fullName').set(function (name) {
  var split = name.split(' ');
  this.firstName = split[0];
  this.lastName = split[1];
});

UserSchema.virtual('fullName').get(function () { //now you can treat as if this was a property instead of a function
  if (!this.firstName) return null;
  if (!this.lastName) return this.firstName;

  return this.firstName + ' ' + this.lastName;
});

UserSchema.methods.getJWT = function() {
  let expiration_time = parseInt(CONFIG.jwt_expiration);
  return "Bearer " + jwt.sign({ user_id: this._id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
};

UserSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};

let User = module.exports = mongoose.model('User', UserSchema);
