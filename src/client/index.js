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

    /*require('angular');
    require('angular-ui-router');

    angular.element(document).ready(function(){
        angular.module('ChildCare', [ 'ui.router' ])
            .config(require('route.js'))
            .controller('HomeController', require('app/home/homeController.js'))
            .controller('ChildController', require('app/child/childController.js'));

        angular.bootstrap(document, ['ChildCare']);

    });*/
})();


