﻿'use strict';
//http://jbavari.github.io/blog/2014/06/11/unit-testing-angularjs-services/
//http://www.benlesh.com/2013/05/angularjs-unit-testing-controllers.html

angular.module('myApp.auth', ['ngRoute'] )

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/authentication', {
            templateUrl: 'authentication/authentication.html',
            controller: 'LoginController'
        });
    }])

    .controller('LoginController', ['$scope', 'Auth',
        function ($scope, Auth) {
            $scope.username   = '';
            $scope.password  = '';
            $scope.token = '';

            $scope.login = function () {
                $scope.dataLoading = true;
                Auth.login($scope.username, $scope.password)
                    .then(function (response) {
                        if (response.success) {
                            Auth.setToken($scope.username);
                            $location.path('/view1');
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    });
            };
        }])

    .factory('Auth', function ($scope, $http, $q, $timeout) {

        //var login = function (username, password, callback) {
        //
        //    var deferred = $q.defer();
        //
        //    $timeout(function () {
        //        var response = {success: username === 'test' && password === 'test'};
        //        if (!response.success) {
        //            response.message = 'Username or password is incorrect';
        //        }
        //        callback(response);
        //    }, 100);
        //
        //    return deferred.promise;

        /* Use this for real authentication
         ----------------------------------------------*/
        //$http.post('/api/authenticate', { username: username, password: password })
        //    .success(function (response) {
        //        callback(response);
        //    });

        //};

        //var readToken = function readToken() {
        //    var storedToken = window.localStorage.getItem('token');
        //    try {
        //        if (storedToken) {
        //            // Note: Using a simple user model here
        //            $scope.token = JSON.parse(storedToken);
        //        }
        //    } catch (ex) { /* Silently fail..*/
        //    }
        //};

        var setToken= function (token) {
            $scope.token = token;
        };

        return {
            login: function (username, password, callback) {
                var deferred = $q.defer();
                $timeout(function () {
                    var response = {success: username === 'test' && password === 'test'};
                    if (!response.success) {
                        response.message = 'Username or password is incorrect';
                    }
                    callback(response);
                }, 100);
                return deferred.promise;
            },
            setToken: setToken
        };
    });