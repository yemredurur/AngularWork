/**
 * Created by ydurur on 23/01/16.
 */

var app = angular.module('userListApp', ["firebase"]),
    fireBaseUrl = "https://shining-torch-9442.firebaseio.com";


app.factory("userLists", ["$firebaseArray",
    function($firebaseArray) {
        // create a reference to the database location where we will store our data
        var ref = new Firebase(fireBaseUrl+'/users');
        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
    }
]);

app.factory("User", ["$firebaseObject",
    function($firebaseObject) {
        return function(userKey) {
            // create a reference to the database node where we will store our data
            var ref = new Firebase(fireBaseUrl+'/users');
            var userRef = ref.child(userKey);
            // return it as a synchronized object
            return $firebaseObject(userRef);
        }
    }
]);

app.controller('userListViewController', ['$scope', '$firebaseObject', 'userLists', 'User',
    function($scope, $firebaseObject, userLists, User){
        $scope.usersList = userLists;
        $scope.showAdded = false;

        $scope.addUser = function () {
            $scope.usersList.$add({
                id: $scope.userId,
                name: $scope.userName,
                phone: $scope.userPhone,
                email : $scope.userEmail,
                address: {
                    city: "San Francisco",
                    street: "California",
                    suite: "Apt. 692",
                    zipcode: 94103
                }
            });
            $scope.showAdded = true;

            setTimeout(function(){
                $scope.showAdded = false;
            }, 2000);
        };

        $scope.deleteUser = function(key){
            var obj = User(key);
            obj.$remove().then(function(ref) {
                console.log('data has been deleted locally and in the database');
            }, function(error) {
                console.log("Error:", error);
            });
        };

        $scope.editUser = function(user){
            var edit = 'showEdit'+user.id;
            $scope[ edit ] = true
        };

        $scope.saveUser = function(user){
            var edit = 'showEdit'+user.id;
            $scope[ edit ] = false;
            userLists.$save(user).then(function(ref) {
                console.log('data has been saved locally and in the database');
            }, function(error) {
                console.log("Error:", error);
            });
        };

    }
]);

