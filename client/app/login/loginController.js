(function () {
    'use strict';

    angular.module('ChildCare')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(authorization) {
        var vm = this;

        vm.microsoftUrl = authorization.getAuthUrl();

    }

}());