var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: {type: String, required: true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  trials:[{type:mongoose.Schema.Types.ObjectId,ref: 'Trial'}],
  picture: { type: String  },
  createdOn: { type: Date, required: true }
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
