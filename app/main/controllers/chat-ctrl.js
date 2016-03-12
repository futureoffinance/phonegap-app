/*global Pusher, cordova */
'use strict';
angular.module('main')
.controller('ChatCtrl', function ($scope, $log, $pusher, $http, $timeout, $stateParams, $ionicScrollDelegate, $ionicLoading) {
  var client = new Pusher('ad5496398d2aec862326', {
      cluster: 'eu',
      encrypted: true
    }),
    pusher = $pusher(client),
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS(),
    origin = $stateParams.origin || 'client';


  $scope.sendMessage = function () {
    $scope.chatLoading = true;

    $http({
      method: 'POST',
      url: 'https://futureoffinance.herokuapp.com/chat',
      data: {
        text: $scope.data.message,
        origin: $scope.data.origin
      }
    }).then(function (response) {
      $log.debug('POST', response);
      delete $scope.data.message;

      if (origin === 'client') {
        $timeout(function () {
          $scope.agentResponseIsLoading = true;
          $timeout(function () {
            $ionicScrollDelegate.scrollBottom(true);
          }, 300);
        }, 1000);
      }
    }).finally(function () {
      $scope.chatLoading = false;
    });

    $ionicScrollDelegate.scrollBottom(true);
  };

  $scope.inputUp = function () {
    if (isIOS) {
      $scope.data.keyboardHeight = 50;
    }

    $timeout(function () {
      $ionicScrollDelegate.scrollBottom(true);
      $ionicScrollDelegate.resize();
    }, 300);
  };

  $scope.inputDown = function () {
    if (isIOS) {
      $scope.data.keyboardHeight = 0;
    }

    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function () {
    if (window.cordova !== undefined) {
      cordova.plugins.Keyboard.close();
    }
  };

  $scope.showLoading = function () {
    $ionicLoading.show({ template: 'Loading...' });
  };

  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  $scope.agentResponseIsLoading = false;
  $scope.data = {
    origin: origin
  };
  $scope.messages = [];

  // Get all of the messages
  $scope.showLoading();
  $http({
    method: 'GET',
    url: 'https://futureoffinance.herokuapp.com/chat'
  }).then(function (response) {
    $log.debug('GET', response);
    $scope.messages = response.data;
  }).finally(function () {
    $scope.hideLoading();
  });


  // Listen for changes
  var channel = pusher.subscribe('fofchat');
  channel.bind('msg', function (message) {
    $log.debug('LISTEN', message);
    $scope.messages.push(message);

    if (message.origin === 'server') {
      $scope.agentResponseIsLoading = false;
    }

    $timeout(function () {
      $ionicScrollDelegate.scrollBottom(true);
    }, 100);
  });

});