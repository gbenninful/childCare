(function () {
    'use strict';

    angular.module('childCare', ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'client/app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                })
                .state('child', {
                    url: '/child',
                    templateUrl: 'client/app/child/child.html',
                    controller: 'ChildController',
                    controllerAs: 'vm'
                });

            $urlRouterProvider.otherwise('/');
        });

})();


