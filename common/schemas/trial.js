var Joi = require('joi');
var UUID = require('uuid');

module.exports = {
  id : Joi.string().guid().default(UUID.v4()).required(),
  name: Joi.string().alphanum().min(1).max(128),
  dog : Joi.string().guid().default(UUID.v4()).required(),
  difficulty: Joi.string().default('excellent').valid(['novice', 'open', 'excellent', 'masters']),
  class: Joi.string().default('jumpers').valid(['jumpers', 'standard']),
  height: Joi.string().default('20').valid(['8', '10', '12', '14', '16', '18', '20', '22', '24']),
  points: Joi.number().default(0).required(),
  nq: Joi.boolean().required().default(false),
  preferred: Joi.boolean().required().default(false),
  date : Joi.date().timestamp().default(new Date(Date.now())),
  time : Joi.number().default(0),
  yards : Joi.number().default(0),
  SCT : Joi.number().default(0),
  judge : Joi.string().guid().default(UUID.v4()).required()
};

