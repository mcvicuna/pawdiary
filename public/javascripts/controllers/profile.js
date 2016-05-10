exports.ProfileController = function($scope, $user, $log) {
  $scope.user = $user;
  $log.log('Hello from ProfileController');

  setTimeout(function() {
    $scope.$emit('ProfileController');
  }, 0);
};
