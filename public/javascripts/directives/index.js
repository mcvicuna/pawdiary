// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
// var files = ['main.js','nav-bar.js'];
// files.forEach(function(file) {
//   if (file.match(/\.js$/) !== null && file !== 'index.js') {
//     var name = file.replace('.js', '');
//     exports[name] = require('./' + file);
//   }
// });
/*jshint -W069 */
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

exports.profile = function() {
  return {
    controller: 'ProfileController',
    templateUrl: '/templates/profile.html'
  };
};

exports.dogs = function() {
  return {
    controller: 'DogController',
    templateUrl: '/templates/dogs.html'
  };
};

exports.trials = function() {
  return {
    controller: 'TrialsController',
    templateUrl: '/templates/trials.html'
  };
};
