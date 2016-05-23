var mongoose = require('mongoose');
var schemas = require('../../common/schemas/index.js');

module.exports = function(wagner) {
  var dbConnectionString = wagner.invoke(function(Config) {
    return Config.dbConnectionString;
  });
  mongoose.connect(dbConnectionString);

  wagner.factory('db', function() {
    return mongoose;
  });

  var models = {
    User: mongoose.model('User', schemas.User, 'users'),
    Dog: mongoose.model('Dog', schemas.Dog, 'dogs'),
    Trial: mongoose.model('Trial', schemas.Trial, 'trials'),
    Judge: mongoose.model('Judge', schemas.Judge, 'judges'),
  };


  wagner.factory('Model', function() {
      return models;
  });

  return models;
};
