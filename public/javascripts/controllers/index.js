// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
// var files = ['main.']
// files.forEach(function(file) {
//  if (file.match(/\.js$/) !== null && file !== 'index.js') {
//    var name = file.replace('.js', '');
//    exports[name] = require('./' + file);
//  }
// });
/*jshint -W069 */

exports.MainController = require('./main').MainController;
exports.NavBarController = require('./nav-bar').NavBarController;
exports.DogsController = require('./dogs').DogsController;
exports.DogController = require('./dog').DogController;
exports.ProfileController = require('./profile').ProfileController;
exports.TrialsController = require('./trials').TrialsController;
exports.UserInfoController = require('./user-info').UserInfoController;