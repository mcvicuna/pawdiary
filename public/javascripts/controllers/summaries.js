
exports.SummariesController = function ($scope, $rootScope, $user, $log, $mdDialog, $dogs, $summaries) {

    $scope.user = $user;
    $log.log('Hello from SummariesController');

    if (!$scope.user) {
        return;
    }

    $scope.summaries = [];

    $scope.refresh = function () {
        $summaries.query(function (summaries) {
            $scope.summaries = summaries;
        });
    };

    $scope.refresh();

    setTimeout(function () {
        $scope.$emit('SummariesController');
    }, 0);
};
