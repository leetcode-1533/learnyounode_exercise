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
    this.create = function(post) {
        return $http.post('/posts', post).success(function(data) {
            this.posts.push(data);
        });
    };
});

// scope: variable in html
app.controller("Controller", [
    '$scope',
    'posts_factory',
    function($scope, posts_factory){
        $scope.posts = posts_factory.posts;

        $scope.addPost = function(){
            if(!$scope.title || $scope.title=== ' '){return};
            posts_factory.create({
                title: $scope.title,
                upvote: 0,
                link: $scope.link,
            });
            $scope.title = "";
            $scope.link ="";
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
            .state('home_tk', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'Controller',
                resolve: {
                    postPromise: ['posts_factory', function (posts_factory) {
                        return posts_factory.getAll();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }])