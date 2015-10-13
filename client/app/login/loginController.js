(function () {
    'use strict';

    angular.module('ChildCare')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($mdToast, Session) {
        var vm = this;
        vm.guest = {};
        vm.guest.address = [];
        vm.guest.phone = [];
        vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY')
            .split(' ').map(function (state) {
                return {value: state};
            });

        vm.register = register;
        vm.showSuccess = showSuccess;

        function showSuccess(type) {
            var msg = "Data successfully saved.";
            $mdToast.show({
                template: '<md-toast class="md-toast ' + type +'">' + msg + '</md-toast>',
                position: 'top right'
            });
        }

        function register(form) {
            if (form.$valid) {
                Session.registerUnit(vm.guest).then(function (data) {
                    console.log('Data posted successfully ', data);
                    vm.showSuccess('success');
                }, function (error) {
                    console.log('Error posting data ', error);
                });
            } else {
                console.log("Errors in form");
            }
        }


    }
}());