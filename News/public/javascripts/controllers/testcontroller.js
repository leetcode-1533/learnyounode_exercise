/**
 * Created by y1275963 on 11/14/16.
 */
app.controller('sqlform', [
    '$scope',
    '$http',
    'posts_factory',
    function($scope, $http, posts_factory) {
        // $scope.test = posts_factory.test;
        // console.log(posts_factory.test);
        $scope.reset = function() {
            console.log($scope.sqlform);
            $scope.sqlform = {};
            $scope.RightSqlShow = false;

        };

        var validateRight = function() {
            if(!$scope.sqlform.rightsql || $scope.sqlform.rightsql=== ' '){
                $scope.RightSqlWrongMessage = "Empty Input";
                $scope.RightSqlShow = true;
                return;
            };

            $http({
                url: '/newquestion/validateRightSql',
                method: 'GET',
                params: {RightSql: $scope.sqlform.rightsql}
            }).success(function(data) {
                $scope.RightSqlWrongMessage = "SQL Success \n".concat(data);
                $scope.RightSqlShow = true;
                $scope.RightSqlAlertType = "alert-success";

                console.log(data);
            }).error(function(data, status, headers) {
                $scope.RightSqlWrongMessage = data;
                $scope.RightSqlShow = true;
                $scope.RightSqlAlertType = "alert-danger";
            })
        };

        $scope.validateRight = function($http) {
            validateRight();
        };
    }
]);