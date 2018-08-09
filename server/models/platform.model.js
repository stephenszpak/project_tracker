const mongoose = require('mongoose');

let PlatformSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
}, {
  timestamps: true
});

PlatformSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};

let Platform = module.exports = mongoose.model('Platform', PlatformSchema);
