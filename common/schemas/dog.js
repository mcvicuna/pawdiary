var mongoose = require('mongoose');

var Dog = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  thumb: { type: String, default: '/images/ic_insert_photo_black_48px.svg' },
  retired: { type: Boolean, required: true, default: false },
  hidden: { type: Boolean, required: true, default: false },
  createdOn: { type: Date, required: true }
});

module.exports = Dog;
module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
