/**
 * Created by George on 9/26/2015.
 */
(function () {
    'use strict';

    angular.module('ChildCare')
        .config(configuration);

    /** @ngInject */
    function configuration($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
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