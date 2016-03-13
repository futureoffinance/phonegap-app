/*global Pusher, cordova */
'use strict';
angular.module('main')
.controller('ChatCtrl', function ($rootScope, $scope, $log, $pusher, $http, $timeout, $stateParams, $ionicScrollDelegate, $ionicLoading) {
  var client = new Pusher('ad5496398d2aec862326', {
      cluster: 'eu',
      encrypted: true
    }),
    pusher = $pusher(client),
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS(),
    origin = $stateParams.origin || 'client';

  var postMessage = function (message) {
    message = message || $scope.data.message;

    $scope.messages.push({
      origin: origin,
      text: message,
      id: new Date().getUTCMilliseconds(),
    });

    $http({
      method: 'POST',
      url: 'https://futureoffinance.herokuapp.com/chat',
      data: {
        text: message,
        origin: $scope.data.origin
      }
    }).then(function (response) {
      $log.debug('POST', response);
      delete $scope.data.message;

      if (origin === 'client') {
        $timeout(function () {
          $scope.agentResponseIsLoading = true;
          scrollBottom();
        }, 1000);
      }
    }).finally(function () {
      $scope.chatLoading = false;
    });
  };

  var scrollBottom = function () {
    $timeout(function () {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);
  };

  $scope.sendMessage = function () {
    $scope.chatLoading = true;

    if ($scope.data.message.length > 8 && $scope.data.message.substr(1, 5) === 'giphy') {
      $http({
        method: 'GET',
        url: 'http://api.giphy.com/v1/gifs/random?tag=' + encodeURIComponent($scope.data.message.substr(7)) + '&api_key=dc6zaTOxFJmzC'
      }).then(function (response) {
        postMessage('<img src="' + response.data.data.image_url + '" class="img-responsive" />');
      });

      return;
    }

    postMessage();
    scrollBottom();
  };

  $scope.inputUp = function () {
    if (isIOS) {
      $scope.data.keyboardHeight = 50;
    }

    scrollBottom();
    $timeout(function () {
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

  $rootScope.newMessages = 1;
  $scope.$watch('messages.length', function () {
    if ($scope.messages.length <= 1) {
      return;
    }

    if ($scope.messages[$scope.messages.length - 1].origin !== origin) {
      $rootScope.newMessages = 1;
    } else {
      $rootScope.newMessages = 0;
    }
  });


  // Listen for changes
  var channel = pusher.subscribe('fofchat');
  channel.bind('msg', function (message) {
    $log.debug('LISTEN', message);

    if (message.text !== $scope.messages[$scope.messages.length - 1].text) {
      $scope.messages.push(message);
    }


    if (message.origin === 'server') {
      $scope.agentResponseIsLoading = false;
    }

    scrollBottom();
  });

});
