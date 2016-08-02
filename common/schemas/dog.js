var Joi = require('joi');
var UUID = require('uuid');

module.exports = {
  id : Joi.string().guid().default(UUID.v4()).required(),
  name: Joi.string().alphanum().min(1).max(128).required(),
  owner: Joi.string().guid().default(UUID.v4()).required(),
  height: Joi.string().default('20').valid(['8', '10', '12', '14', '16', '18', '20', '22', '24']),
  thumb: Joi.string().min(1).max(128).default('/images/ic_insert_photo_black_48px.svg'),
  retired: Joi.boolean().required().default(false),
  hidden: Joi.boolean().required().default(false),
  difficulty: Joi.string().default('excellent').valid(['novice', 'open', 'excellent', 'masters']),
  points: Joi.number().default(0).required(),
  qq: Joi.number().default(0).required(),
  summary_points: Joi.number().default(0).required(),
  summary_qq: Joi.number().default(0).required(),
  summary_difficulty: Joi.string().default('dirty').valid(['dirty','novice', 'open', 'excellent', 'masters']).required()
};

// module.exports.set('toObject', { virtuals: true });
// module.exports.set('toJSON', { virtuals: true });
