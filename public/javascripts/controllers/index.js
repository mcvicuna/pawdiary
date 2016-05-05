// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
//require('fs').readdirSync(__dirname + '/').forEach(function(file) {
//  if (file.match(/\.js$/) !== null && file !== 'index.js') {
//    var name = file.replace('.js', '');
//    exports[name] = require('./' + file);
//  }
//});

// this is kludgey until I can find a better way to organize
exports.MainController = function($scope, $user) {
  $scope.user = $user;

  setTimeout(function() {
    $scope.$emit('MainController');
  }, 0);
};

exports.NavBarController = function($scope, $user) {
  $scope.user = $user;

  setTimeout(function() {
    $scope.$emit('NavBarController');
  }, 0);
};
