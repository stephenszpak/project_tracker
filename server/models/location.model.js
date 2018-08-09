const mongoose = require('mongoose');

let LocationSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
}, {
  timestamps: true
});

LocationSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};

let Location = module.exports = mongoose.model('Location', LocationSchema);
