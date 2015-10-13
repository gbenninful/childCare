(function () {
    'use strict';

    angular.module('ChildCare')
        .controller('NavbarController', NavbarController);

    /** @ngInject */
    function NavbarController($mdSidenav) {
        var vm = this;

        vm.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

    }
}());



