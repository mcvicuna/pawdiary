// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
// require('fs').readdirSync(__dirname + '/').forEach(function(file) {
//   if (file.match(/\.js$/) !== null && file !== 'index.js') {
//     var name = file.replace('.js', '');
//     exports[name] = require('./' + file);
//   }
// });

// this is kludgey until I can find a better way to organize

exports.main = function() {
  return {
    controller: 'MainController',
    templateUrl: '/templates/main.html'
  };
};

exports.navBar = function() {
  return {
    controller: 'NavBarController',
    templateUrl: '/templates/nav_bar.html'
  };
};
