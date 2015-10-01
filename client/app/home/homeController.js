/**
 * Created by George on 9/26/2015.
 */
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