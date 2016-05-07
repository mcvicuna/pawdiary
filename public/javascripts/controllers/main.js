exports.MainController = function($scope, $user, $location, $mdSidenav, $timeout, $log) {
  $scope.user = $user;

    var allMuppets =[{
      name: 'Home',
      iconurl: 'https://lh3.googleusercontent.com/-KGsfSssKoEU/AAAAAAAAAAI/AAAAAAAAAC4/j_0iL_6y3dE/s96-c-k-no/photo.jpg',
      contenturl: '/'
  }, {
      name: 'Dogs',
      iconurl: 'https://yt3.ggpht.com/-cEjxni3_Jig/AAAAAAAAAAI/AAAAAAAAAAA/cMW2NEAUf-k/s88-c-k-no/photo.jpg',
      contenturl: '/dogs.html'
  }, {
      name: 'Trials',
      iconurl: 'https://goingforwardblog.files.wordpress.com/2013/01/swedish-chef.jpg',
      contenturl: '/trials.html',
  }, {
      name: 'Profile',
      iconurl: 'https://lh5.googleusercontent.com/-c5rVqhf66e4/UVIKJ3fXLFI/AAAAAAAAACU/s-TU4ER7-Ro/w800-h800/kimmie.jpg',
      contenturl: '/profile.html',
  }];

    $scope.selected = null;
    $scope.muppets = allMuppets;
    $scope.selectMuppet = selectMuppet;
    $scope.toggleSidenav = toggleSidenav;
    $scope.selected = $scope.muppets[0];

    function toggleSidenav(name) {
      $mdSidenav(name).toggle();
    }

    function selectMuppet(muppet) {
      $scope.selected = angular.isNumber(muppet) ? $scope.muppets[muppet] : muppet;
      $location.url($scope.selected.contenturl);
      $scope.toggleSidenav('left');
    }

  setTimeout(function() {
    $scope.$emit('MainController');
  }, 0);
};
