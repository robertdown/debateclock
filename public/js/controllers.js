'use strict';

/* Controllers */

angular.module('debateclock.controllers', []).
  controller('AppCtrl', function ($scope, socket) {    
  }).
  controller('AdminCtrl', function($scope, socket) {
    $scope.speakers = [];
    socket.emit('get:speakers');
    socket.on('send:speakers', function(data) {
      $scope.speakers = data;
    });

    $scope.beginTime = function(user) {
      console.log(user);
      socket.emit('set:speakers', user);
    };
  }).
  controller('MyCtrl1', function ($scope, socket) {
    $scope.speakers = [];
    socket.emit('get:speakers');
    setInterval(function() {
      console.log("get:speakers");
      socket.emit('get:speakers');
    }, 1000);
    socket.on('send:speakers', function(data) {
      $scope.speakers = data;
    });
  });
