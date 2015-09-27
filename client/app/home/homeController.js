/**
 * Created by George on 9/26/2015.
 */
(function () {
    "use strict";

    angular
        .module('childCare')
        .controller('HomeController', HomeController);

    /**@ngInject*/

    function HomeController($scope) {

        var vm = this;

        vm.name = 'Hello there';

    }
}());