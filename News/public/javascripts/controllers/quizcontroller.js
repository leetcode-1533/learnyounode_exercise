/**
 * Created by y1275963 on 11/14/16.
 */

app.controller('QuizCtrl', [
    '$scope',
    '$http',
    'quiz_service',
    function($scope, $http){
        $scope.questions = [
            {"questionText": "Why is the sky blue?", "answers": [
                {"answerText":"blah blah 1", "correct": true},
                {"answerText":"blah blah 2", "correct": false},
                {"answerText":"blah blah 3", "correct": false}
            ]},
            {"questionText": "Why is the meaning of life?", "answers": [
                {"answerText":"blah blah 1", "correct": true},
                {"answerText":"blah blah 2", "correct": false},
                {"answerText":"blah blah 3", "correct": false}
            ]},
            {"questionText": "How many pennies are in $10.00?", "answers": [
                {"answerText":"1,000.", "correct": true},
                {"answerText":"10,000.", "correct": false},
                {"answerText":"A lot", "correct": false}
            ]},
            {"questionText": "What is the default program?", "answers": [
                {"answerText":"Hello World.", "correct": true},
                {"answerText":"Hello Sunshine.", "correct": false},
                {"answerText":"Hello my ragtime gal.", "correct": false}
            ]}
        ];
        $scope.answers ={};
        $scope.correctCount = 0;

        $scope.showResult = function(){
            $scope.correctCount = 0;
            var qLength = $scope.questions.length;
            for(var i=0;i<qLength;i++){
                var answers = $scope.questions[i].answers;
                $scope.questions[i].userAnswerCorrect = false;
                $scope.questions[i].userAnswer = $scope.answers[i];
                for(var j=0;j<answers.length;j++){
                    answers[j].selected = "donno";
                    if ($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct===true){
                        $scope.questions[i].userAnswerCorrect = true;
                        answers[j].selected = "true";
                        $scope.correctCount++;
                    }else if($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct===false){
                        answers[j].selected = "false";
                    }
                }
            }
        };
        $scope.addQuiz = function(){
            if(!$scope.question || $scope.question=== ' '){return};

            var quiz = {
                question: $scope.question,
                sql: $scope.sql
            };

            // console.log(quiz);

            $http.post('/addquiz', quiz).then(function(data) {
                console.log(data);
            });

            $scope.question = "";
            $scope.sql ="";
        };
    }
]);

angular.module('quiz.service', []);
angular.module('quiz.directive', []);
angular.module('quiz.filter', []);

angular.module('quiz', ['quiz.service','quiz.directive','quiz.filter']);