var fs = require('fs');

module.exports = function(wagner,app) {
  wagner.factory('Config', function() {
    configFile = app.get('env') === 'development' ?
      './config/dev/config.json'
      : './config/prod/config.json';
    return JSON.parse(fs.readFileSync(configFile).toString());
  });
};
