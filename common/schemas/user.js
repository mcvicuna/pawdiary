var Joi = require('joi');
var UUID = require('uuid');

module.exports = {
    id : Joi.string().guid().default(UUID.v4()).required(),
    email: Joi.string().email(),
    picture : Joi.string().uri().default('/images/ic_insert_photo_black_48px.svg'),
    fb_id : Joi.string(),
    fb_token : Joi.string(),
    fb_email : Joi.string().email(),
    fb_name : Joi.string(),
    gg_id : Joi.string(),
    gg_token : Joi.string(),
    gg_email : Joi.string().email(),
    gg_name : Joi.string(),
    dog_trial_limit : Joi.number().default(2).required(),    
    friends : Joi.array().items(Joi.string().guid()).meta({dynamoType : 'SS'}),
    dogs : Joi.array().items(Joi.string().guid()).meta({dynamoType : 'SS'}),
  }; 
  
  // module.exports.set('toObject', { virtuals: true });
  // module.exports.set('toJSON', { virtuals: true });
