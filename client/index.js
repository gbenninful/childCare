(function () {
    'use strict';

    require('angular');
    require('angular-ui-router');

    angular.element(document).ready(function(){
        angular.module('childcare', [ 'ui.router' ])
            .config(require('../client/route.js'))
            .controller('HomeController', require('../client/app/home/homeController.js'))
            .controller('ChildController', require('../client/app/child/childController.js'));

        angular.bootstrap(document, ['childcare']);

    });
})();


