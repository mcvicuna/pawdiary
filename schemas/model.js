var mongoose = require('mongoose');

module.exports = function(wagner) {
  var dbConnectionString = wagner.invoke(function(Config) {
    return Config.dbConnectionString;
  });
  mongoose.connect(dbConnectionString);

  wagner.factory('db', function() {
    return mongoose;
  });

  var models = {
    User: mongoose.model('User', require('./user'), 'users')
  };


  wagner.factory('Model', function() {
      return models;
  });

  return models;
};
