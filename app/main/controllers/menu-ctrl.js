'use strict';
angular.module('main')
.controller('MenuCtrl', function ($scope, $timeout, $ionicPlatform, $cordovaLocalNotification) {

  $ionicPlatform.ready(function () {
    $scope.scheduleDelayedNotification = function () {
      var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 10 * 1000);

      if (Object.keys($cordovaLocalNotification).length <= 0) {
        return;
      }

      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        at: _10SecondsFromNow
      }).then(function () {
        // ...
      });
    };

    $timeout(function () {
      $scope.scheduleDelayedNotification();
    }, 1000);
  });

});
