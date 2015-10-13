
(function () {
    "use strict";

    angular.module('childCare')
    .controller('ChildController', ['$scope', function($scope){

        var vm = this;
        vm.name = 'Hello child #1';
    }]);


}());