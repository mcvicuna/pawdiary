var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trial' }],
  thumb: { type: String, default: '/images/ic_insert_photo_black_48px.svg' },
  retired: { type: Boolean, required: true, default: false },
  hidden: { type: Boolean, required: true, default: false },
  createdOn: { type: Date, required: true }
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
