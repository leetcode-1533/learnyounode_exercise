/**
 * Created by y1275963 on 11/14/16.
 */
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
            })
            .state('quiz', {
                url:'/quiz',
                templateUrl: '/quiz.html',
                controller: "QuizCtrl",
                resolve: {
                    postPromise: ['quiz_service', function(quiz_service) {
                        return quiz_service.getQuiz();
                    }]
                }
            })
            .state('test', {
                url: '/test',
                templateUrl: '/test.html',
                controller: 'test',
                resolve: {
                    postPromise: ['posts_factory', function(posts_factory) {
                        return posts_factory.test_func();
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
}])