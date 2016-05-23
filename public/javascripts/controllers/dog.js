exports.DogController = function ($scope, $rootScope, $mdDialog, $log, $dogs, dog, mode) {
  $scope.dog = angular.copy(dog);
  $log.log('Hello from DogController');
  $scope.difficulties = ['novice', 'open', 'excellent', 'masters'];

  $scope.onSave = function () {
    $scope.dogForm.$setSubmitted();
    if ($scope.dogForm.$valid) {
      $log.log('saving dog with mode '+mode);
      $mdDialog.hide({dog:$scope.dog, mode:mode});
    }
  };

  $scope.onDelete = function () {
    $mdDialog.hide({dog:$scope.dog, mode:-1});
  };

  $scope.onCancel = function () {
    $mdDialog.cancel();
  };

  setTimeout(function () {
    $scope.$emit('DogController');
  }, 0);

  $scope.closeDialog = function () {
    $mdDialog.cancel()
  };
};
