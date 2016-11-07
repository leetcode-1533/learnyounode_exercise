/**
 * Created by y1275963 on 10/30/16.
 */
// var angular = require('angular')
// angular.module('News', )
var app = angular.module('News', ['ui.router']);
app.service('posts_factory', function($http) {
    var _posts = []
    this.posts = _posts;

    this.getAll = function() {
        return $http.get('/posts').success(function(data) {
            angular.copy(data, _posts);
        });
    };
});
// var factory_function = function($http) {
//     var object = {
//         posts:[]
//     }
//
//     object.getAll = function() {
//         return $http.get('/posts').success(function(data){
//             angular.copy(data, object.posts);
//         });
//     };
//     return object;
// }
//
// app.factory('posts_factory', ['$http', factory_function])
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
            $scope.posts.push({title: $scope.title,
                upvote: 0,
                link: $scope.link,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            });
            $scope.title = ""
            $scope.link =""
        }
        $scope.incrementUpvotes = function(post) {
            post.upvote += 1;
        }
    }
]);

app.controller('PostCtrl', [
    '$scope',
    '$stateParams',
    'posts_factory',
    function($scope, $stateParams, posts_factory){
        $scope.post = posts_factory.posts[$stateParams.id];

        $scope.addComment = function(){
            if(!$scope.body) {
                return;
            }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
        };
    }
]);
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'Controller',
                resolve: {
                    postPromise: ['posts_factory', function(posts_factory){
                        return posts_factory.getAll();
                    }]
                }
                // before controller, a list of promise
                // resolve: {
                //     postPromise:['posts', function(posts){
                //         return posts.getAll();
                //     }]
                // }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }])