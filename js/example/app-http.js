/**
 * Created by ydurur on 23/01/16.
 */

var app = angular.module('httpApp', []),
    usersJsonUrl = "http://jsonplaceholder.typicode.com/users";
    commentsJsonUrl = "http://jsonplaceholder.typicode.com/comments?postId=";

app.controller('HttpViewController', ['$scope','$http', function($scope, $http){

    $http.get(usersJsonUrl)
        .success(function (data) {
            $scope.usersList = data;
        });

    $scope.getComments = function ($userId) {
        $http.get(commentsJsonUrl + $userId)
            .success(function (data) {
                $scope.comments = data;
            });
    };

}]);
