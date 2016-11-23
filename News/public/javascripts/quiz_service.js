/**
 * Created by y1275963 on 11/22/16.
 */
app.service('quiz_service', function($http) {
    var _quiz = [];
    var _test = {};

    this.quiz = _quiz;

    this.getQuiz = function() {
        $http.get('/quiz_list').success(function(data) {
            angular.copy(data, _quiz);
            // console.log(data);
        });
    };

    // this.posts = _posts;
    // this.getAll = function() {
    //     return $http.get('/posts').success(function(data) {
    //         angular.copy(data, _posts);
    //     });
    // };
    // this.create = function(post) {
    //     return $http.post('/posts', post).success(function(data) {
    //         this.posts.push(data);
    //     });
    // };
    // this.test_func = function() {
    //     return $http.get('/test_http').success(function(data) {
    //         angular.copy(data, _test);
    //         console.log(data[0]);
    //     });
    // }
});