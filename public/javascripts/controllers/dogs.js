exports.DogController = function($scope, $user, $log, $dogs) {
  $scope.user = $user;
  $log.log('Hello from DogController');

  setTimeout(function() {
    $scope.$emit('DogController');
  }, 0);

  $scope.submitDog = function() {
    var dog = new $dogs({name:"d1"});
    dog.$save();
  };
};
