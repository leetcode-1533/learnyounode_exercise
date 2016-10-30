/**
 * Created by y1275963 on 10/30/16.
 */
// var angular = require('angular')
var app = angular.module('News', []);

app.controller("Controller", [
    '$scope',
    function($scope){
        $scope.test = "Hello World";
    }
]);