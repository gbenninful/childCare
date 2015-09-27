/**
 * Created by George on 9/26/2015.
 */
(function () {
    "use strict";

    angular
        .module('childcare')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

}());