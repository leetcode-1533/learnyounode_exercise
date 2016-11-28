/**
 * Created by y1275963 on 11/14/16.
 */
app.service('posts_factory', function($http) {
    var _posts = []
    var _test = {};
    this.posts = _posts;
    this.test = _test;

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
    // this.test_func = function() {
    //     return $http.get('/test_http').success(function(data) {
    //         angular.copy(data, _test);
    //         console.log(data[0]);
    //     });
    // }
});