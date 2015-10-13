(function () {
    'use strict';

    angular.module('ChildCare')
        .controller('ChildController', ChildController);

    /** @ngInject */
    function ChildController($http) {

        var vm = this;
        vm.name = 'Home sweet home';


        $http({
            method: 'GET',
            url: '/api/expenseList'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            vm.expenseList  = response.data;

        }, function errorCallback(error) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('error', error);
        });
    }

}());