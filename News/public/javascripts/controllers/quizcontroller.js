/**
 * Created by y1275963 on 11/14/16.
 */

app.controller('quizctrl', [
    '$scope',
    '$stateParams',
    '$http',
    'quiz_service',
    function($scope, $stateParams, $http, quiz_service) {
        $scope.quiz_id = $stateParams.id;
        var quiz_all = quiz_service.quiz;
        // var quiz_all;
        // angular.copy(quiz_service.quiz, quiz_all);
        $scope.question_order = -1;

        $scope.getQuestion = function(question_order) {
            $http({
                url: '/test_http',
                method: "GET",
                params: {question_id: question_order}
            })
            .success(function (data) {
                // console.log(data);

                var temp_question =
                {"question": data['question'],
                    "correct_answer": data['answer'][0]['answer'],
                    "hint_taken": false,
                    "user_answer": false,
                    "options": [
                        {"answerText":data['answer'][0]['answer'], "correct": true, "disabled": false},
                        {"answerText":data['answer'][1]['options'], "correct": false, "disabled": false},
                        {"answerText":data['answer'][2]['options'], "correct": false, "disabled": false},
                        {"answerText":data['answer'][3]['options'], "correct": false, "disabled": false}
                    ]
                };
                $scope.questions = temp_question;
            })
            .error(function (data) {
                console.log('Error:'+data);
            });
        }

        $scope.get_next_question = function() {
            $scope.question_order = $scope.question_order + 1;
            // console.log(quiz_all[question_order]);
            console.log(quiz_all[$scope.question_order]);
            $scope.getQuestion(quiz_all[$scope.question_order]);
            console.log($scope.questions);
        }
        $scope.getQuestion(quiz_all[$scope.question_order]);
    }
]);

app.filter('numberToAlphabet', function(){
    return function(number){
        return String.fromCharCode(number+65);
    }
});