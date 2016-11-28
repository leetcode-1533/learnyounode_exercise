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
        $scope.quiz_all = quiz_service.quiz;

        $scope.getCurrentQuestion = function() {
            $http({
                url: '/test_http',
                method: "GET",
                params: {question_id: $scope.quiz_id}
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
                for(var i=0;i<temp_question['options'].length;i++){
                    if(temp_question['options'][i].correct == true){
                        temp_question['correct_option'] = i;
                    }
                }
                // console.log(temp_question);
                $scope.questions = temp_question;
                console.log($scope.questions);
            })
            .error(function (data) {
                console.log('Error:'+data);
            });
        }

        $scope.getCurrentQuestion();
    }
]);

app.filter('numberToAlphabet', function(){
    return function(number){
        return String.fromCharCode(number+65);
    }
});