var Joi = require('joi');
var DogController = require('./dog');
var UUID = require('uuid');

var modeEnum = {
  DELETE: -1,
  ADD: 1,
  UPDATE: 2  
};

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
      name: 'Starting Points',
      field: 'points'
    },
    {
      name: 'Starting Double',
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

  function dogSave(answer) {
    $log.log('saving dog with ' + answer.mode);
    if (answer.mode == modeEnum.ADD ) {
      answer.dog.id = UUID.v4();
     Joi.validate(answer.dog, $schemas.Dog, function(err, dog) {
       if ( err )
         throw err;
       new_dog = new $dogs(dog);
       new_dog.$save(function () {
          $scope.refresh();
       });
      });
    }
    else if (answer.mode == modeEnum.UPDATE ) {
      $dogs.save({ id: answer.dog.id }, answer.dog, function () {
        $scope.refresh();
      });
    }
    else if (answer.mode == modeEnum.DELETE ) {
      $dogs.remove({ id: answer.dog.id, }, answer.dog, function () {
        $scope.refresh();
      });
    }
  }
  
  function showDogDialog($event, dog, mode) {
    $mdDialog.show({
      controller: DogController.DogController,
      templateUrl: 'templates/dog.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true, 
      locals: { dog: dog, mode: mode }
    })
      .then(dogSave, function () { });
  }



  $scope.newDog = function () {
    dog = $schemas.Dog.default().validate({owner : $user.user.id },{abortEarly : false}).value;
    showDogDialog(null, dog, modeEnum.ADD);    
  };

  $scope.onEdit = function ($event, dog) {
    showDogDialog($event, dog, modeEnum.UPDATE);    
  };

  $scope.openMenu = function ($mdOpenMenu, event) {
    originatorEvent = event;
    $mdOpenMenu(event);
  };

  setTimeout(function () {
    $scope.$emit('DogsController');
  }, 0);
};
