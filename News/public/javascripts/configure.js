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
            .state('quizs', {
                url:'/quiz',
                templateUrl: '/quizs.html',
                controller: "QuizCtrl",
                resolve: {
                    postPromise: ['quiz_service', function(quiz_service) {
                        return quiz_service.getQuiz();
                    }]
                }
            })
            .state('quiz', {
                url: '/quiz/{id}',
                templateUrl: '/quiz.html',
                controller: "quizctrl"
            })
            .state('sqlform', {
                url: '/newquestion',
                templateUrl: '/sqlform.html',
                controller: 'sqlform'
                // resolve: {
                //     postPromise: ['posts_factory', function(posts_factory) {
                //         return posts_factory.test_func();
                //     }]
                // }
            });

        $urlRouterProvider.otherwise('home');
}])