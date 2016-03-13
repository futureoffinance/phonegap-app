'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/lock');
  $stateProvider
    .state('lockscreen', {
      url: '/lock',
      templateUrl: 'main/templates/lockscreen.html',
      controller: 'LockScreenCtrl'
    })
    .state('lockscreenfallback', {
      url: '/lockfb',
      templateUrl: 'main/templates/lockscreenfallback.html',
      controller: 'LockScreenFallbackCtrl'
    })
    .state('main', {
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
    .state('main.home', {
      url: '/home',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('main.chat', {
      url: '/chat/:origin?',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/chat.html',
          controller: 'ChatCtrl'
        }
      }
    });
});
