exports.TrialController = function ($scope, $rootScope, $mdDialog, $log, $dogs, $trials, trial, mode) {
  $scope.trial = trial;
  $scope.selectedDog = trial.dog;
  $scope.classes = ['jumpers', 'standard', 'fast'];
  $scope.difficulties = ['novice', 'open', 'excellent', 'masters'];
  $scope.heights = ['8', '10', '12', '14', '16', '18', '20', '22', '24'];
  $scope.tempDate = new Date($scope.trial.date);
  $log.log('Hello from trialController');

  $scope.dogs = [];

  $dogs.query(function (dogs) {
    $scope.dogs = dogs;
  });


  $scope.onSave = function () {
    $scope.trialForm.$setSubmitted();
    if ($scope.trialForm.$valid) {
      $scope.trial.dog = $scope.selectedDog.id;
      $scope.trial.date = new Date($scope.trial.date).getTime();
      $log.log('saving trialForm with mode ' + mode);
      $mdDialog.hide({ trial: $scope.trial, mode: mode });
    }
  };

  $scope.onDelete = function () {
    $scope.trial.dog = $scope.selectedDog.id;
    $scope.trial.date = new Date($scope.trial.date).getTime();
    $mdDialog.hide({ trial: $scope.trial, mode: -1 });
  };

  $scope.onCancel = function () {
     $mdDialog.cancel();
  };
  
  $scope.closeDialog = function () {
    $mdDialog.cancel();
  };
  
  setTimeout(function () {
    $scope.$emit('TrialController');
  }, 0);

};
