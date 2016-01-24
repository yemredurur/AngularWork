/**
 * Created by ydurur on 23/01/16.
 */

var app = angular.module('fireBaseApp', []),
    fireBaseUrl = "https://shining-torch-9442.firebaseio.com/";
    usersJsonUrl = "http://jsonplaceholder.typicode.com/users";
    commentsJsonUrl = "http://jsonplaceholder.typicode.com/comments?postId=";

app.controller('fireBaseViewController', ['$scope','$http', function($scope, $http){
    $scope.usersFirebase = new Firebase(fireBaseUrl+'/users');


    $scope.usersFirebase.on('value', function(data) {
        $scope.usersList = data.val();
        $scope.usersListTemp = data.val();
        $scope.safeApply(function() {
           //
        });
    });

    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };


    $scope.getComments = function ($userId) {
        $http.get(commentsJsonUrl + $userId)
            .success(function (data) {
                $scope.comments = data;
            });
    };

    $scope.searchUser = function () {
        $scope.usersList = $scope.usersListTemp;
        $scope.searchResult = $scope.usersList.filter(function(item){
            return item.id == $scope.searchName;
        });
        $scope.searchName = '';
        $scope.usersList = $scope.searchResult;

        if(!$scope.searchResult.length){
            alert('No result!');
            $scope.usersList = $scope.usersListTemp;
        }
    };



    $scope.addUser = function () {
        $scope.usersFirebase.push({
            id: $scope.userId,
            name: $scope.userName,
            phone: $scope.userPhone,
            email : $scope.userEmail,
            location: {
                city: "San Francisco",
                state: "California",
                zip: 94103
            }
        });
    };

    $scope.deleteUser = function(key){

        var fredRef = new Firebase(fireBaseUrl+'/users/'+key);
        var onComplete = function(error) {
            if (error) {
                console.log('Synchronization failed');
            } else {
                console.log('Synchronization succeeded');
            }
        };

        fredRef.remove(onComplete);
    }

}]);


