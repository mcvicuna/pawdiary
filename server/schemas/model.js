var vogels = require('vogels');
var schemas = require('../../common/schemas/index.js');
var Joi = require('joi');

module.exports = function(wagner) {

  vogels.AWS.config.update({ accessKeyId: wagner.get('Config').dbAccessKey,
                             secretAccessKey: wagner.get('Config').dbAccessKeySecret,
                             region: wagner.get('Config').awsRegion
                            });

  var opts = { endpoint : wagner.get('Config').dbConnectionString, apiVersion: '2012-08-10' };
  var driver = new vogels.AWS.DynamoDB(opts);
  vogels.dynamoDriver(driver);
  vogels.log.level('info');

  wagner.factory('db', function() {
    return vogels;
  });

  var models = {
    Users: vogels.define('User', {
      hashKey : 'id',
      timestamps : true,
      schema : schemas.User,
      indexes  :[
        { 
          hashKey : 'gg_id', 
          name: 'gg_index', 
          type: 'global', 
          projection:{ ProjectionType : 'KEYS_ONLY'}
        },
        { 
          hashKey : 'fb_id', 
          name: 'fb_index', 
          type: 'global', 
          projection:{ ProjectionType : 'KEYS_ONLY'}
        }
      ]
    }),
    Dog : vogels.define('Dog', {
      hashKey : 'id',
      timestamps : true,
      schema : schemas.Dog 
    }),
    Trial : vogels.define('Trial', {
      hashKey : 'dog',
      timestamps : true,
      schema : schemas.Trial,
      rangeKey : 'id',
      indexes  :[
        { 
          hashKey : 'dog',
          rangeKey : 'date', 
          name: 'date_index', 
          type: 'local',
          projection: { ProjectionType : 'ALL'}
        }]      
    }),
    Judge : vogels.define('Judge', {
      hashKey : 'id',
      timestamps : true,
      schema : schemas.Judge
    })
  };

  vogels.createTables({
    'User': {readCapacity:10, writeCapacity:10},
    'Dog': {readCapacity:10, writeCapacity:10},
    'Trial': {readCapacity:10, writeCapacity:10},
    'Judge': {readCapacity:10, writeCapacity:10}
  }, function(err) {
    if (err) {
      console.log('Error creating tables: ', err);
    } else {
      console.log('Tables has been created');
    }    
  });


  wagner.factory('Model', function() {
      return models;
  });

  wagner.factory('Schema',function() {
      return schemas;
  });

  return models;
};
