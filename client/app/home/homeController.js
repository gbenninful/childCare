(function () {
    'use strict';

    angular.module('ChildCare')
        .controller('ChildController', ChildController);

    /** @ngInject */
    function ChildController() {
        var vm = this;
        vm.name = 'Hello there';
    }
}());