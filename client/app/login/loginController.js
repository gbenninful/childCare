(function () {
    'use strict';

    angular.module('ChildCare')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(Session) {
        var vm = this;
        vm.guest = {};
        vm.guest.address = [];
        vm.guest.phone = [];
        vm.states = [
            {label: 'First', value: 'AA'},
            {label: 'Second', value: 'BB'},
            {label: 'Third', value: 'CC'}
        ];

        vm.register = register;

        function register(form) {
            if (form.$valid) {
                Session.registerParent(vm.guest).then(function (data) {
                    console.log('Data posted successfully ', data);
                }, function (error) {
                    console.log('Error posting data ', error);
                });
            } else {
                console.log("Errors in form");
            }
        }

    }

}());