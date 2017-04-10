'use strict';

angular.module('catsApp', [
    'ngAnimate',
    'ngMaterial',
    'catsList',
    'catsAdd',
    'ui.router',
]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'cat-picker',
        url: '/',
        component: 'catsList'
    }).state({
        name: 'cat-add',
        url: '/add',
        component: 'catsAdd'
    });
    $urlRouterProvider.otherwise('/');
}).run(function ($window, $rootScope, $q) {
    const deferred = $q.defer();
    $rootScope.windowLoaded = deferred.promise;
    $window.onload = function () {
        deferred.resolve()
    };
});

