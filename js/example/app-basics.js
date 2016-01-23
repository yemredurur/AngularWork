/**
 * Created by ydurur on 23/01/16.
 */

var app = angular.module('exampleApp', []);

app.controller('ExampleViewController', ['$scope', function($scope){
    $scope.name = 'Yusuf Emre Durur';
    $scope.expense = {
        description : 'food',
        amount : 10
    };

    $scope.selectedItem = null;

    $scope.increaseAmount = function () {
        $scope.expense.amount++;
    };

    $scope.items = [
        {
            id: 1,
            name: 'pizza',
            ingredients: ['cheese', 'tomato', 'oregano', 'salt']
        },

        {
            id: 2,
            name: 'tortilla',
            ingredients: ['butter', 'salt', 'pepper', 'garlic']
        },

        {
            id: 3,
            name: 'cake',
            ingredients: ['cream', 'sugar']
        },

        {
            id: 4,
            name: 'empanada',
            ingredients: ['flour', 'meat', 'onion']
        }
    ];

    $scope.selectFood = function ($foodId) {
        $scope.selectedItem = $scope.items[$foodId-1].ingredients;
    };

}]);
