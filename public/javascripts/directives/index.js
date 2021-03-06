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
exports.main = function () {
  return {
    controller: 'MainController',
    templateUrl: '/templates/main.html'
  };
};

exports.navBar = function () {
  return {
    controller: 'NavBarController',
    templateUrl: '/templates/nav_bar.html'
  };
};

exports.profile = function () {
  return {
    controller: 'ProfileController',
    templateUrl: '/templates/profile.html'
  };
};

exports.dogs = function () {
  return {
    controller: 'DogsController',
    templateUrl: '/templates/dogs.html'
  };
};

exports.dog = function () {
  return {
    controller: 'DogController',
    templateUrl: '/templates/dog.html'
  };
};

exports.trial = function () {
  return {
    controller: 'TrialController',
    templateUrl: '/templates/trial.html'
  };
};

exports.trials = function () {
  return {
    controller: 'TrialsController',
    templateUrl: '/templates/trials.html'
  };
};

exports.userInfo = function () {
  return {
    controller: 'UserInfoController',
    templateUrl: '/templates/user-info.html'
  };
};

exports.summaries = function () {
  return {
    controller: 'SummariesController',
    templateUrl: '/templates/summaries.html'
  };
}