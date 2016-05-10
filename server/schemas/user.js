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
  friends:[{type:mongoose.Schema.Types.ObjectId,ref: 'User'}],
  dogs:[{type:mongoose.Schema.Types.ObjectId,ref: 'Dog'}],
  createdOn: { type: Date, required: true },
  logOn: { type: Date, required: true }
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
