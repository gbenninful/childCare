/**
 * Created by George on 9/26/2015.
 */
(function () {
    "use strict";

    /** @ngInject */
    module.exports = function ($stateProvider, $urlRouterProvider) {
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