
(function () {
    "use strict";


    angular.module('childCare')
    .controller('HomeController', ['$scope', function($scope){

        var vm = this;
        vm.name = 'Hello there. Welcome!';
    }]);


}());