exports.DogController = function ($scope, $rootScope, $log, $dogs) {
  $scope.dog = new $dogs({ name: "", thumb: "/images/ic_insert_photo_black_48px.svg" });;
  $log.log('Hello from DogController');
  $scope.difficulties = ['novice','open','excellent','masters'];


  $rootScope.$on('DogController.dog', function (event, dog) {
    $scope.dog = angular.copy(dog);
    $log.log('Hello from dogEditing');
  });

  $scope.onSave = function () {
    $scope.dogForm.$setSubmitted();
    if ($scope.dogForm.$valid) {
      $scope.$emit('DogController.save', $scope.dog);
    }
  };

  $scope.onDelete = function () {
    $scope.$emit('DogController.delete', $scope.dog);
  };
  
  $scope.onCancel = function () {
    $scope.$emit('DogController.cancel');
  };

  setTimeout(function () {
    $scope.$emit('DogController');
  }, 0);

};
