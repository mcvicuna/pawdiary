var mongoose = require('mongoose');

exports.TrialController = function ($scope, $rootScope, $user, $log, $dogs, $trials, $schemas) {
  $scope.trial = new mongoose.Document({}, $schemas.Trial);
  $scope.classes = ['jumpers','standard','fast'];
  $scope.difficulties = ['novice','open','excellent','masters'];
  $scope.heights = ['8','10','12','14','16','18','20','22','24'];
  $scope.tempDate = new Date($scope.trial.date);
  $log.log('Hello from trialController');
  
  $scope.dogs = [];
  
  $dogs.query(function(dogs) {
    $scope.dogs = dogs;
  });


  $rootScope.$on('TrialController.trial', function (event, trial) {
    $scope.trial = angular.copy(trial);
    $scope.tempDate = new Date(trial.date);
    $log.log('Hello from trialEditing');
  });

  $scope.onSave = function () {
    $scope.trialForm.$setSubmitted();
    if ($scope.trialForm.$valid) {
      $scope.$emit('TrialController.save', $scope.trial);
    }
  };

  $scope.onDelete = function () {
    $scope.$emit('TrialController.delete', $scope.trial);
  };
  
  $scope.onCancel = function () {
    $scope.$emit('TrialController.cancel');
  };

  setTimeout(function () {
    $scope.$emit('TrialController');
  }, 0);

};
