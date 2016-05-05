var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    picture: {
      type: String,
      required: true
    }
  },
  data: {
    oauth: {
      type: String,
      required: true }
  },
  createdOn: { type: Date, required: true },
  logOn: { type: Date, required: true }
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
