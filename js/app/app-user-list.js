/**
 * Created by ydurur on 23/01/16.
 */

var app = angular.module('userListApp',  ["firebase"]),
    fireBaseUrl = "https://shining-torch-9442.firebaseio.com/";



app.controller('userListViewController', ['$scope','userLists',
    function($scope, userLists){
        $scope.usersFirebase = new Firebase(fireBaseUrl+'/users');

        console.log(userLists);

        $scope.usersFirebase.on('value', function(data) {

            $scope.safeApply(function() {
                $scope.usersList = data.val();
                $scope.usersListTemp = data.val();
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
    }
]);


app.factory("userLists", ["$firebaseArray",
    function($firebaseArray) {
        // create a reference to the database location where we will store our data
        console.log(fireBaseUrl);
        var randomRoomId = Math.round(Math.random() * 100000000);
        var ref = new Firebase(fireBaseUrl+'users' + randomRoomId);
        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
    }
]);


