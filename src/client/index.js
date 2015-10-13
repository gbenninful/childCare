(function () {
    'use strict';

    angular.module('childCare', ['ui.router'])

    .config(Apphome);

    Apphome.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Apphome ($stateProvider, $urlRouterProvider) {
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

})();


