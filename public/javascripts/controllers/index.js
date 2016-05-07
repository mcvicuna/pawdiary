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

// exports.MainController = function($scope, $user, $mdSidenav, $timeout, $log) {
//   $scope.user = $user;
//
//     var allMuppets =[{
//       name: 'Animal',
//       iconurl: 'https://lh3.googleusercontent.com/-KGsfSssKoEU/AAAAAAAAAAI/AAAAAAAAAC4/j_0iL_6y3dE/s96-c-k-no/photo.jpg',
//       imgurl: 'http://muppethub.com/wp-content/uploads/2014/02/Animal-7.png',
//       content: 'Animal is the wild and frenzied drummer of Dr. Teeth and The Electric Mayhem, the fictional band from The Muppet Show. He is one of the Muppets originally created by Michael K. Frith.'
//   }, {
//       name: 'Fozzie Bear',
//       iconurl: 'https://yt3.ggpht.com/-cEjxni3_Jig/AAAAAAAAAAI/AAAAAAAAAAA/cMW2NEAUf-k/s88-c-k-no/photo.jpg',
//       imgurl: 'http://i.ytimg.com/vi/x-OdqmzkuRg/maxresdefault.jpg',
//       content: 'Fozzie Bear is a Muppet character created by Jim Henson and developed by Frank Oz. Fozzie is an orange-brown, fozzie bear who often wears a brown pork pie hat and a red-and-white polka-dot necktie. The character debuted on The Muppet Show, as the show\'s stand-up comic, a role where he constantly employed his catchphrase, "Wocka Wocka Wocka!". Shortly after telling the joke, he was usually the target of ridicule, particularly from balcony hecklers Statler and Waldorf.'
//   }, {
//       name: 'The Swedish Chef',
//       iconurl: 'https://goingforwardblog.files.wordpress.com/2013/01/swedish-chef.jpg',
//       imgurl: 'http://muppetmindset.files.wordpress.com/2012/02/8ff4c-ms_sc_05.jpg',
//       content: 'The Swedish Chef is a Muppet character that appeared on The Muppet Show. He was originally performed by Jim Henson and Frank Oz simultaneously, with Henson performing the head and voice and Oz performing the character\'s live hands. The Swedish Chef is now performed by Bill Barretta.'
//   }, {
//       name: 'Cookie Monster',
//       iconurl: 'https://lh5.googleusercontent.com/-c5rVqhf66e4/UVIKJ3fXLFI/AAAAAAAAACU/s-TU4ER7-Ro/w800-h800/kimmie.jpg',
//       imgurl: 'http://bakadesuyo.bakadesuyo.netdna-cdn.com/wp-content/uploads/2013/12/ways-to-increase-willpower.jpg',
//       content: 'Cookie Monster is a Muppet on the long running children\'s television show Sesame Street. He is best known for his voracious appetite and his famous eating phrases: "Me want cookie!", "Me eat cookie!", and "Om nom nom nom" (said through a mouth full of food). He often eats anything and everything, including danishes, donuts, lettuce, apples, bananas, as well as normally inedible objects. However, as his name suggests, his preferred food is cookies. Chocolate chip cookies are his favorite kind; oatmeal cookies are his second favorite.'
//   }];
//
//     $scope.selected = null;
//     $scope.muppets = allMuppets;
//     $scope.selectMuppet = selectMuppet;
//     $scope.toggleSidenav = toggleSidenav;
//     $scope.selected = $scope.muppets[0];
//
//     function toggleSidenav(name) {
//       $mdSidenav(name).toggle();
//     }
//
//     function selectMuppet(muppet) {
//       $scope.selected = angular.isNumber(muppet) ? $scope.muppets[muppet] : muppet;
//       $scope.toggleSidenav('left');
//     }
//
//   setTimeout(function() {
//     $scope.$emit('MainController');
//   }, 0);
// };
//
// exports.NavBarController = function($scope, $user, $log) {
//   $scope.user = $user;
//   $log.log('Hello from nav bar');
//
//   setTimeout(function() {
//     $scope.$emit('NavBarController');
//   }, 0);
// };

exports.MainController = require('./main').MainController;
exports.NavBarController = require('./nav-bar').NavBarController;
exports.DogController = require('./dogs').DogController;
exports.ProfileController = require('./profile').ProfileController;
exports.TrialsController = require('./trials').TrialsController;
