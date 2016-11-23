/**
 * Created by y1275963 on 11/14/16.
 */

app.controller('quizctrl', [
    '$scope',
    '$stateParams',
    '$http',
    'quiz_service',
    function($scope, $stateParams, $http, quiz_service) {
        $scope.quiz_id = $stateParams.id;
        var test;
        $scope.quiz_all = quiz_service.quiz;


    }
]);