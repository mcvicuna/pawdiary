exports.MainController = function($scope, $user) {
  $scope.user = $user;

  setTimeout(function() {
    $scope.$emit('MainController');
  }, 0);
};
