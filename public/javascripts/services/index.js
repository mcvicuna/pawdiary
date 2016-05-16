// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
// var files = ['me.js'];
// files.forEach(function(file) {
//   if (file.match(/\.js$/) !== null && file !== 'index.js') {
//     var name = file.replace('.js', '');
//     exports[name] = require('./' + file);
//   }
// });
/*jshint -W069 */


exports.$user = require('./me').$user;
exports.$dogs = require('./dogs').$dogs;
exports.$trials = require('./trials').$trials;
exports.$schemas = require('./schemas').$schemas;

