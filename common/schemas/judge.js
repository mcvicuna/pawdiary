var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    lastName: {
      type: String,
      required: true,
      lowercase: true
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true
    },
  
  createdOn: { type: Date, required: true },
  logOn: { type: Date, required: true }
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
