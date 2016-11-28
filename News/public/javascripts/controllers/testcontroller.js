/**
 * Created by y1275963 on 11/14/16.
 */
app.controller('sqlform', [
    '$scope',
    '$http',
    'posts_factory',
    function($scope, $http, posts_factory) {
        $scope.reset = function() {
            console.log($scope.sqlform);
            $scope.sqlform = {};
            $scope.RightSqlShow = false;
            $scope.AlterSqlShow = false;
            $scope.alternativeData = {};

        };


        $scope.validateRight = function(req_length) {
            if(!$scope.sqlform.rightsql || $scope.sqlform.rightsql=== ' '){
                $scope.RightSqlWrongMessage = "Empty Input";
                $scope.RightSqlShow = true;
                $scope.RightSqlAlertType = "alert-danger";

                return;
            };

            $http({
                url: '/newquestion/validateRightSql',
                method: 'GET',
                params: {RightSql: $scope.sqlform.rightsql, Requiredlength:req_length}
            }).success(function(data) {
                $scope.RightSqlWrongMessage = "SQL Success" + "\n" + "Given Result: ".concat(data[0].answer);
                $scope.RightSqlShow = true;
                $scope.RightSqlAlertType = "alert-success";
                return;
            }).error(function(data, status, headers) {
                $scope.RightSqlWrongMessage = data;
                $scope.RightSqlShow = true;
                $scope.RightSqlAlertType = "alert-danger";
                return;
            })
        };

        $scope.validateAlter = function(req_length) {
            if(!$scope.sqlform.wrongsql || $scope.sqlform.wrongsql=== ' '){
                $scope.AlterSqlWrongMessage = "Empty Input";
                $scope.AlterSqlShow = true;
                $scope.AlterSqlAlertType = "alert-danger";

                return;
            };

            $http({
                url: '/newquestion/validateRightSql',
                method: 'GET',
                params: {RightSql: $scope.sqlform.wrongsql, Requiredlength:req_length}
            }).success(function(data) {
                $scope.AlterSqlWrongMessage = "SQL Success Given Result: ";
                $scope.AlterSqlShow = true;
                $scope.AlterSqlAlertType = "alert-success";

                $scope.alternativeData = data;

            }).error(function(data, status, headers) {
                $scope.AlterSqlWrongMessage = data;
                $scope.AlterSqlShow = true;
                $scope.AlterSqlAlertType = "alert-danger";
                $scope.alternativeData = {};
            })
        };
    }
]);