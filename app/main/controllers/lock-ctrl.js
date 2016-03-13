'use strict';
angular.module('main')
.controller('LockScreenCtrl', function ($scope, $timeout, $location, $cordovaTouchID) {
  $cordovaTouchID.checkSupport().then(function () {
    $cordovaTouchID.authenticate('Touch the home button to log in.').then(function () {
      $location.path('/home');
    }, function () {
      $location.path('/lockfb');
    });
  }, function () {
    $location.path('/lockfb');
  });
});
