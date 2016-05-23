var mongoose = require('mongoose');
var TrialController = require('./trial');

var modeEnum = {
  DELETE: -1,
  ADD: 1,
  UPDATE: 2
};

exports.TrialsController = function ($scope, $rootScope, $user, $log, $mdDialog, $dogs, $trials, $schemas) {
  var originatorEvent;

  $scope.user = $user;
  $log.log('Hello from TrialsController');
  $scope.editing = null;
  $scope.mode = 0;
  $scope.headers = [
    {
      name: 'Dog',
      field: 'dogName'
    },
    {
      name: 'Date',
      field: 'date'
    },
    {
      name: 'Class',
      field: 'class'
    },
    {
      name: 'Difficulty',
      field: 'difficulty'
    },
    {
      name: 'Points',
      field: 'points'
    }
  ];

  $scope.dogs = [];
  $scope.trials = [];

  if (!$scope.user) {
    return;
  }

  $scope.refresh = function () {
    $trials.query(function (trials) {
      trials.forEach(function (trial) {
        trial.dogName = trial.dog.name;
      });
      $scope.trials = trials;
    });
  };

  $dogs.query(function (dogs) {
    $scope.dogs = dogs;
  });

  $scope.refresh();

  function trialSave(answer) {
    $log.log('saving trial with ' + answer.mode);
    if (answer.mode == modeEnum.ADD) {
      newTrial = new $trials(new mongoose.Document(answer.trial, $schemas.Trial));
      delete newTrial.id;
      newTrial.createdOn = Date.now();
      newTrial.$save(function () {
        $scope.refresh();
      });
    }
    else if (answer.mode == modeEnum.UPDATE) {
      $trials.save({ id: answer.trial.id }, answer.trial, function () {
        $scope.refresh();
      });
    }
    else if (answer.mode == modeEnum.DELETE) {
      $trials.remove({ id: answer.trial.id, }, answer.trial, function () {
        $scope.refresh();
      });
    }
  }

  function showTrialDialog($event, trial, mode) {
    $mdDialog.show({
      controller: TrialController.TrialController,
      templateUrl: 'templates/trial.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: { trial: trial, mode: mode }
    })
      .then(trialSave, function () { });
  }



  $scope.newTrial = function () {
    showTrialDialog(null, mongoose.Document({}, $schemas.Trial), modeEnum.ADD); 1;
  };

  $scope.onEdit = function (trial) {
    showTrialDialog(null, trial, modeEnum.UPDATE);
  };

  $scope.openMenu = function ($mdOpenMenu, event) {
    originatorEvent = event;
    $mdOpenMenu(event);
  };

  setTimeout(function () {
    $scope.$emit('TrialController');
  }, 0);
};
