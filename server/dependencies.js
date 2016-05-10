var fs = require('fs');

module.exports = function(wagner,app) {
  wagner.factory('Config', function() {
    configFile = app.get('env') === 'development' ?
      './server/config/dev/config.json'
      : './server/config/prod/config.json';
    return JSON.parse(fs.readFileSync(configFile).toString());
  });
};
