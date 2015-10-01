/**
 * Created by George on 9/26/2015.
 */
(function () {
    'use strict';

    angular.module('ChildCare')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController() {

        var vm = this;
        vm.name = 'Home sweet home';
    }

}());