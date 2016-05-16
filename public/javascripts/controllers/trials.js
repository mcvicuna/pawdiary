var mongoose = require('mongoose');

exports.TrialsController = function ($scope, $rootScope, $user, $log, $mdDialog, $dogs, $trials, $schemas) {
  var originatorEvent;

  $scope.user = $user;
  $log.log('Hello from TrialsController');
  $scope.editing = null;
  $scope.mode = 0;
  $scope.headers = [
    {
      name:'Dog',
      field:'dogName'
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
      trials.forEach(function(trial) {
        trial.dogName = trial.dog.name;
      });      
      $scope.trials = trials; 
    });
  };

  $dogs.query(function(dogs) {
    $scope.dogs = dogs;
  });
  
  $scope.refresh();

  $scope.newTrial = function () {
    var trial = new mongoose.Document({}, $schemas.Trial);
    $scope.mode = 1;
    $scope.editing = trial;
    $rootScope.$broadcast('TrialController.trial', trial);
    $scope.trials.unshift(trial);
  };

  $scope.onEdit = function (trial) {
    $scope.mode = 2;
    $scope.editing = trial;
    $rootScope.$broadcast('TrialController.trial', trial);
  };

  $scope.openMenu = function ($mdOpenMenu, event) {
    originatorEvent = event;
    $mdOpenMenu(event);
  };

  // 
  $scope.$on('TrialController', function (event, msg) {
    if ($scope.editing) {
      $rootScope.$broadcast('TrialController.trial', $scope.editing);
    }
  });

  $scope.$on('TrialController.save', function (event, trial) {
    if ($scope.editing) {
      if ( $scope.mode == 1 ) {
        $scope.editing = new $trials(trial);
        $scope.editing.$save(function() {
          $scope.refresh();        
        });
      }
      else {
        $trials.save({id:$scope.editing.id},trial,function() {
          $scope.refresh();        
        });
      }
      $scope.mode = 0;
      
    }
  });

  $scope.$on('TrialController.delete', function (event, trial) {
    $trials.remove({ id: trial.id, }, trial, function () {
      $scope.editing = null;
      $scope.refresh();
    });
  });

  $scope.$on('TrialController.cancel', function (event) {
    if ($scope.editing) {
      $scope.editing = null;
    }
  });

  setTimeout(function () {
    $scope.$emit('TrialController');
  }, 0);
};
