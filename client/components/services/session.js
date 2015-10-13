(function () {
    'use strict';

    angular.module('ChildCare')
        .factory('Session', session);

    /** @ngInject */
    function session($http, $q) {

        return {
            authorize: authorize,
            registerUnit: registerUnit
        };

        function authorize(data) {
            return makeRequest('POST', '/v1/authorize', data);
        }


        function registerUnit(data) {
            return makeRequest('POST', '/v1/apartment', data);
        }


        function makeRequest(method, url, data) {
            var deferred = $q.defer();
            $http({
                method: method,
                url: url,
                data: angular.toJson(data)
            }).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
})();
