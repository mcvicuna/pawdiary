exports.NavBarController = function($scope, $user, $log) {
  $scope.user = $user;
  $log.log('Hello from nav bar');

  setTimeout(function() {
    $scope.$emit('NavBarController');
  }, 0);
};
