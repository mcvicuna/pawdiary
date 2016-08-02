var Joi = require('joi');


exports.$schemas = function() {
  schemas = require('../../../common/schemas/index.js');
  Object.keys(schemas).forEach(function(key) {
          schemas[key] = Joi.object(schemas[key]);
  });
  return schemas;
}; 
