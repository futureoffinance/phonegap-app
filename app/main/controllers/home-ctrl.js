'use strict';
angular.module('main')
.controller('HomeCtrl', function ($scope) {

  $scope.transactions = [{
    id: 1,
    group: 'today',
    amount: 5.99,
    description: 'Train Ticket',
    icon: 'ion-android-train'
  }, {
    id: 2,
    group: 'today',
    amount: 14.81,
    description: 'Train Ticket',
    icon: 'ion-android-train'
  }, {
    id: 3,
    group: 'yesterday',
    amount: 9.01,
    description: 'Train Ticket',
    icon: 'ion-android-train'
  }, {
    id: 4,
    group: 'yesterday',
    amount: 50.02,
    description: 'Hardware store',
    icon: 'ion-hammer'
  }, {
    id: 5,
    group: 'yesterday',
    amount: 111.92,
    description: 'Hardware store',
    icon: 'ion-hammer'
  }, {
    id: 6,
    group: 'today',
    amount: 59.99,
    description: 'Starbucks',
    icon: 'ion-coffee'
  }, {
    id: 7,
    group: 'today',
    amount: 101.92,
    description: 'Hardware store',
    icon: 'ion-hammer'
  }];

  $scope.expensesToday = 0;
  $scope.balance = 1290;

  $scope.$watch('transactions', function (oldValue, newValue) {
    var expenses = 0;

    angular.forEach(newValue, function (row) {
      if (row.group === 'today') {
        expenses += row.amount;
      }
    });

    $scope.expensesToday = parseInt(expenses, 10);
  });
});
