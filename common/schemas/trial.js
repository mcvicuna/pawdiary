var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: { type: String, required: false },
  dog: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog' },
  class: { type: String, default:'jumpers', enum: ['jumpers', 'standard', 'fast'] },
  difficulty: { type: String, default: 'excellent', enum: ['novice', 'open', 'excellent', 'masters'] },
  height: { type: String, default:'20', enum: ['8', '10', '12', '14', '16', '18', '20', '22', '24'] },
  points: { type: Number, default: 0, required: true },
  nq: { type: Boolean, default: false, required: true },
  date: { type: Date, default: Date.now(), required: true },
  createdOn: { type: Date, default: Date.now(), required: true },
  preferred: { type: Boolean, default: false, required: true },
  time: { type: Number, required: false },
  yards: { type: Number, required: false },
  SCT: { type: Number, required: false },
  judge: { type: mongoose.Schema.Types.ObjectId, required: false },
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
