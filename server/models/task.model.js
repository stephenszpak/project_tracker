const mongoose = require('mongoose');
const { throwErr, to } = require('../services/util.service');

let TaskSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
}, { timestamps: true });

TaskSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id;
  return json;
};

let Task = module.exports = mongoose.model('Task', TaskSchema);
