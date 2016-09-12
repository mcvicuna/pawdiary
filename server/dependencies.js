var fs = require('fs');

module.exports = function(wagner,app) {
  wagner.factory('Config', function() {
    var configFile = './server/config/prod/config.json';
    if ( app.get('env') === 'development' ) {
      configFile = './server/config/dev/config.json';
      // kludge to get env variables
      var pcfConfig = JSON.parse(fs.readFileSync('./server/config/dev/pcf.json').toString());
      for(var k in pcfConfig) {
        process.env[k] = JSON.stringify(pcfConfig[k]);
      }

    }
    var config = JSON.parse(fs.readFileSync(configFile).toString());


    var services = process.env.VCAP_SERVICES !== null ? JSON.parse(process.env.VCAP_SERVICES) : JSON.parse('{ }');

    config.dbConnectionString = services.mlab[0].credentials.uri;

    console.log("Connecting to db uri..." + config.dbConnectionString);

    return config;
  });
};
