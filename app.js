/**
 * Created by y1275963 on 10/30/16.
 */
// var angular = require('angular')
// angular.module('News', )
var app = angular.module('News', ['ui.router']);
var factory_function = function() {
    var object = {
        posts:[
            {title: 'post1', upvote: 3},
            {title: 'post2', upvote: 2},
            {title: 'post3', upvote: 3}
        ]
    }
    return object;
}

app.factory('posts_factory', [factory_function])
// scope: variable in html
app.controller("Controller", [
    '$scope',
    'posts_factory',
    function($scope, posts_factory){

        // $scope.posts = [
        //     {title: 'post1', upvote: 3},
        //     {title: 'post2', upvote: 2},
        //     {title: 'post3', upvote: 3}
        // ];
        $scope.posts = posts_factory.posts;

        $scope.addPost = function(){
            if(!$scope.title || $scope.title=== ' '){return};
            $scope.posts.push({title: $scope.title, upvote: 0, link: $scope.link});
            $scope.title = ""
            $scope.link =""
        }
        $scope.incrementUpvotes = function(post) {
            post.upvote += 1;
        }
    }
]);