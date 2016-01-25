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

app.controller('userListViewController', ['$scope', '$firebaseObject', 'userLists',
    function($scope, $firebaseObject, userLists){
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
                console.log('aaaaaaa');
            }, 2000);
        };

        $scope.deleteUser = function(key){
            var userRef = new Firebase(fireBaseUrl+'/users/'+key);
            var obj = $firebaseObject(userRef);
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

            var userRef = new Firebase(fireBaseUrl+'/users/'+user.$id);
            var obj = $firebaseObject(userRef);
                obj.id = $scope[ edit ].editUserId,
                obj.name = $scope[ edit ].editUserName,
                obj.phone = $scope[ edit ].editUserPhone,
                obj.email = $scope[ edit ].editUserEmail

            obj.$save().then(function(ref) {
                console.log('data has been deleted locally and in the database');
            }, function(error) {
                console.log("Error:", error);
            });
        };
    }
]);

