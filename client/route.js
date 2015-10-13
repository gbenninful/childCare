(function () {
    'use strict';

    angular.module('ChildCare')
        .config(configuration);

    /** @ngInject */
    function configuration($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('child', {
                url: '/child',
                templateUrl: 'app/child/child.html',
                controller: 'ChildController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

}());