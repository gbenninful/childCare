(function () {
    'use strict';

    angular.module('ChildCare')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController($state) {
        var vm = this;

        vm.name = 'Jeff Rey';
        vm.title = 'Kickass web Developer';
        vm.viewChild = viewChild;

        function viewChild() {
            $state.go('child');
            console.log('to child state');
        }
    }
}());