'use strict';

// Declare app level module which depends on filters, and services

angular.module('debateclock', [
  'ngRoute',
  'debateclock.controllers',
  'debateclock.filters',
  'debateclock.services',
  'debateclock.directives',

  // 3rd party dependencies
  'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/clock', {
      templateUrl: 'partials/mainview',
      controller: 'MyCtrl1'
    }).
    when('/admin', {
      templateUrl: 'partials/list',
      controller: 'AdminCtrl'
    }).
    otherwise({
      redirectTo: '/clock'
    });

  $locationProvider.html5Mode(true);
});
