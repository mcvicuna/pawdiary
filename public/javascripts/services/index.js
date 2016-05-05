// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
// require('fs').readdirSync(__dirname + '/').forEach(function(file) {
//   if (file.match(/\.js$/) !== null && file !== 'index.js') {
//     var name = file.replace('.js', '');
//     exports[name] = require('./' + file);
//   }
// });

// this is kludgey until I can find a better way to organize

var status = require('http-status');

exports.$user = function($http) {
  var s = {};

  s.loadUser = function() {
    $http.
      get('/profile').
      success(function(data) {
        s.user = data.user;
      }).
      error(function(data, status) {
        if (status === status.UNAUTHORIZED) {
          s.user = null;
        }
      });
  };

  s.loadUser();

  setInterval(s.loadUser, 60 * 60 * 1000);

  return s;
};
