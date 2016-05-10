exports.DogsController = function ($scope, $rootScope, $user, $log, $mdDialog, $dogs) {
  var originatorEvent;

  $scope.user = $user;
  $log.log('Hello from DogsController');
  $scope.editing = null;
  $scope.headers = [
    {
      name: '',
      field: 'thumb'
    }, {
      name: 'Name',
      field: 'name'
    }];

  $scope.dogs = [];

  if (!$scope.user) {
    return;
  }

  $scope.refresh = function () {
    $dogs.query(function (dogs) {
      $scope.dogs = dogs;
    });
  };

  $scope.refresh();

  $scope.newDog = function () {
    var dog = new $dogs({ name: "", thumb: "/images/ic_insert_photo_black_48px.svg" });
    $scope.editing = dog;
    $rootScope.$broadcast('DogController.dog', dog);
    $scope.dogs.unshift(dog);
  };

  $scope.onEdit = function (dog) {
    $scope.editing = dog;
    $rootScope.$broadcast('DogController.dog', dog);
  };

  $scope.openMenu = function ($mdOpenMenu, event) {
    originatorEvent = event;
    $mdOpenMenu(event);
  };

  // 
  $scope.$on('DogController', function (event, msg) {
    if ($scope.editing) {
      $rootScope.$broadcast('DogController.dog', $scope.editing);
    }
  });

  $scope.$on('DogController.save', function (event, dog) {
    if ($scope.editing) {
      //$scope.editing = new $dogs(dog);
      $dogs.save({id:$scope.editing.id},dog,function() {
        $scope.editing = null;
        $scope.refresh();        
      });
    }
  });

  $scope.$on('DogController.delete', function (event, dog) {
    $dogs.remove({ id: dog.id, }, dog, function () {
      $scope.editing = null;
      $scope.refresh();
    });
  });

  $scope.$on('DogController.cancel', function (event) {
    if ($scope.editing) {
      $scope.editing = null;
    }
  });

  setTimeout(function () {
    $scope.$emit('DogsController');
  }, 0);
};
