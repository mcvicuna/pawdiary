exports.TrialsController = function($scope, $user, $log) {
  $scope.user = $user;
  $log.log('Hello from TrialsController');

  setTimeout(function() {
    $scope.$emit('TrialsController');
  }, 0);
};
