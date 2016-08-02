var fs = require('fs');

module.exports = function(wagner,app) {
  wagner.factory('Config', function() {
    rootDir = __dirname;
    configFile = app.get('env') === 'development' ?
      '/config/dev/config.json'
      : '/config/prod/config.json';
    return JSON.parse(fs.readFileSync(rootDir+configFile).toString());
  });

  if (app.get('env') === 'development') {
      // start up the local dynamodb
      localDynamo = require('local-dynamo');
      localDynamo.launch('/database/dir',  wagner.get('Config').dbPort);
  }
};

