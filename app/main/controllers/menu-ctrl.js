'use strict';
angular.module('main')
.controller('MenuCtrl', function ($scope, $timeout, $ionicPlatform, $cordovaLocalNotification) {

  $ionicPlatform.ready(function () {
    if (ionic.Platform.isWebView() && ionic.Platform.isIOS()) {
      window.plugin.notification.local.promptForPermission();
    }

    $scope.scheduleDelayedNotification = function () {
      var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 10 * 1000);

      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Your B-day is soon.',
        text: 'Here’s a few ideas how to spend it best',
        at: _10SecondsFromNow
      }).then(function () {
        // ...
      });
    };

    $scope.scheduleDelayedNotification();
  });

});
