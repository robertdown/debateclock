'use strict';

/* Directives */

angular.module('debateclock.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
