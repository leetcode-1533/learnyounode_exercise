/**
 * Created by y1275963 on 10/30/16.
 */
// var angular = require('angular')
var app = angular.module('News', []);

app.controller("Controller", [
    '$scope',
    function($scope){
        $scope.posts = [
            {title: 'post1', upvote: 3},
            {title: 'post2', upvote: 2},
            {title: 'post3', upvote: 3}
        ];

        $scope.addPost = function(){
            if(!$scope.title || $scope.title=== ' '){return};
            $scope.posts.push({title: $scope.title, upvote: 0});
            $scope.title = ""
        }
    }
]);