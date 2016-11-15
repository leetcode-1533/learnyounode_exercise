/**
 * Created by y1275963 on 11/14/16.
 */
app.controller('test', [
    '$scope',
    'posts_factory',
    function($scope, posts_factory) {
        $scope.test = posts_factory.test;
        console.log(posts_factory.test);
        // $scope.test = posts_factory.test;
    }
]);