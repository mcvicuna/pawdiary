var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: {type: String, required: true},
  dog: {type: mongoose.Schema.Types.ObjectId, ref: 'Dog'},
  class: {type: String, enum:['jumpers','standard','fast']},
  difficulty: {type: String, enum:['novice','open','excellent','masters']},
  height: {type:String, enum:['8','10','12','14','16','18','20','22','24']},
  points: {type:Number, required:true},
  nq:{type: Boolean, default:false, required: true},
  date: { type: Date, required: true },
  createdOn: { type: Date, required: true },
  preferred: {type: Boolean, default:false, required: true},
  time: {type:Number, required:false},
  yards:{type:Number, required:false},
  SCT:{type:Number, required:false},
  judge: {type: mongoose.Schema.Types.ObjectId, required: false},
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
