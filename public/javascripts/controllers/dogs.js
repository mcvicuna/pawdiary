var mongoose = require('mongoose');

exports.DogsController = function ($scope, $rootScope, $user, $log, $mdDialog, $dogs, $schemas) {
  var originatorEvent;

  $scope.user = $user;
  $log.log('Hello from DogsController');
  $scope.editing = null;
  $scope.mode = 0;
  $scope.headers = [
    {
      name: '',
      field: 'thumb'
    }, {
      name: 'Name',
      field: 'name'
    },
    {
      name: 'Difficulty',
      field: 'difficulty'
    },
    {
      name: 'Points',
      field: 'points'
    },
    {
      name: 'Double',
      field: 'qq'
    }, 
  ];

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
    var dog = new mongoose.Document({}, $schemas.Dog);
    $scope.mode = 1;
    $scope.editing = dog;
    $rootScope.$broadcast('DogController.dog', dog);
    $scope.dogs.unshift(dog);
  };

  $scope.onEdit = function (dog) {
    $scope.mode = 2;
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
      if ( $scope.mode == 1 ) {
        $scope.editing = new $dogs(dog);
        $scope.editing.$save(function() {
          $scope.refresh();        
        });
      }
      else {
        $dogs.save({id:$scope.editing.id},dog,function() {
          $scope.refresh();        
        });
      }
      $scope.mode = 0;
      
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
