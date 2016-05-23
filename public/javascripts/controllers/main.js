exports.MainController = function($scope, $user, $location, $mdSidenav, $timeout, $log) {
  $scope.user = $user;

    var allMuppets =[{
      name: 'Home',
      iconurl: 'images/ic_home_black_48px.svg',
      contenturl: '/'
  }, {
      name: 'Dogs',
      iconurl: 'images/ic_pets_black_48px.svg',
      contenturl: '/dogs.html'
  }, {
      name: 'Trials',
      iconurl: 'images/ic_timer_black_48px.svg',
      contenturl: '/trials.html',
  }, {
      name: 'Profile',
      iconurl: 'images/ic_person_black_48px.svg',
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
