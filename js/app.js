/**
 * Created by ydurur on 23/01/16.
 */

var app = angular.module('expensesApp', []);

app.controller('ExpensesViewController', ['$scope', function($scope){
    $scope.name = 'Yusuf Emre Durur';
    $scope.expense = {
        description : 'food',
        amount : 10
    };

    $scope.increaseAmount = function () {
        $scope.expense.amount++;
    }

    $scope.items = [
        {
            name: 'pizza',
            ingredients: ['cheese', 'tomato', 'oregano', 'salt']
        },

        {
            name: 'tortilla',
            ingredients: ['butter', 'salt', 'pepper', 'garlic']
        },

        {
            name: 'cake',
            ingredients: ['cream', 'sugar']
        },

        {
            name: 'empanada',
            ingredients: ['flour', 'meat', 'onion']
        }
    ];
}]);
