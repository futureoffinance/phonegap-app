'use strict';
angular.module('main')
.controller('LockScreenFallbackCtrl', function ($scope, $timeout, $location) {
  $scope.loadingLogin = false;

  $scope.login = function () {
    $scope.loadingLogin = true;

    $timeout(function () {
      $location.path('/home');
    }, 4000);
  };
});
