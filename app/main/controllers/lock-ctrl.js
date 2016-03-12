'use strict';
angular.module('main')
.controller('LockScreenCtrl', function ($log) {

  $log.log('Lock Screen');

  if (window.plugins && window.plugins.touchid) {
    window.plugins.touchid.verifyFingerprint(
      'Scan your fingerprint please', // this will be shown in the native scanner popup
       function (msg) {alert('ok: ' + msg);}, // success handler: fingerprint accepted
       function (msg) {alert('not ok: ' + JSON.stringify(msg));} // error handler with errorcode and localised reason
    );
  }

});
