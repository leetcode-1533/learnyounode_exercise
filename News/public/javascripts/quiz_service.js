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
        });
    };
});