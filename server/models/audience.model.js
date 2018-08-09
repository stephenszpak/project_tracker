const mongoose = require('mongoose');

let AudienceSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
}, {
  timestamps: true
});

AudienceSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};

let Audience = module.exports = mongoose.model('Audience', AudienceSchema);
