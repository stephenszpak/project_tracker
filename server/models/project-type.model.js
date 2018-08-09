// NOTE: PROJECT TYPE**
const mongoose = require('mongoose');

let ProjectTypeSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
}, {
  timestamps: true
});

ProjectTypeSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};

let ProjectType = module.exports = mongoose.model('ProjectType', ProjectTypeSchema);
