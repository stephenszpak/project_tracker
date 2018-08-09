const mongoose = require('mongoose');
const Notify = require('../config/notifications');

let ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  projectSponsor: {
    type: String
  },
  executiveSponsor: {
    type: String
  },
  productSponsor: {
    type: String
  },
  projectStatus: {
    type: String
  },
  projectType: {
    type: String
  },
  locationsImpacted: [{
    type: String
  }],
  audiencesImpacted: [{
    type: String
  }],
  platformsImpacted: [{
    type: String
  }],
  newPricingRules: {
    type: Boolean
  },
  volume: {
    type: Number
  },
  revenueAtList: {
    type: Number
  },
  dealFormEligible: {
    type: Boolean
  },
  newTitles: {
    type: String
  },
  newAccounts: {
    type: String
  },
  projectDetails: {
    type: String
  },
  businessCase: {
    type: String
  },
  comments: {
    type: String
  },
}, {
  timestamps: true
});

ProjectSchema.methods.notifyIfLessThan500 = function() {
  if (this.locationsImpacted == 'LS US' && this.volume < 500000) {
    Notify.notifyLessThanUS();
  } else if (this.locationsImpacted == 'LS US' && this.volume > 500000) {
    Notify.notifyGreaterThanUS();
  } else if (this.locationsImpacted == 'LS UK' || 'LS AU' && this.volume < 500000) {
    Notify.notifyLessThanUKAU();
  } else if (this.locationsImpacted == 'LS UK' || 'LS AU' && this.volume > 500000) {
    Notify.notifyGreaterThanUKAU();
  }
};

ProjectSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id;
  return json;
};

let Project = module.exports = mongoose.model('Project', ProjectSchema);
