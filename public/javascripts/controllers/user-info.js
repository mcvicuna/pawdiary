exports.UserInfoController = function($scope, $user, $log) {
  $scope.user = $user;
  $log.log('Hello from UserInfoController');

  setTimeout(function() {
    $scope.$emit('UserInfoController');
  }, 0);
};
