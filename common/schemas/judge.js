var Joi = require('joi');
var UUID = require('uuid');

module.exports = {
  id : Joi.string().guid().default(UUID.v4()).required(),
  first: Joi.string().alphanum().min(1).max(128).required(),
  last: Joi.string().alphanum().min(1).max(128).required()
};
