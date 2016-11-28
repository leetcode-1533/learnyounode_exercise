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
            $scope.RightSqlWrong = false;
        };

        var validateRight = function() {
            $http({
                url: '/newquestion/validateRightSql',
                method: 'GET',
                params: {sqlstr: $scope.sqlform.rightsql}
            }).success(function(data) {
                console.log("Success");
            }).error(function(data, status, headers) {
                // alert(status);
                $scope.RightSqlWrongMessage = data;
                $scope.RightSqlWrong = true;
                // alert(data);
                // console.log("error");
            })
        };

        $scope.validateRight = function($http) {
            console.log(validateRight());
        };
    }
]);