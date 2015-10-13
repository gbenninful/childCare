(function () {
    'use strict';

    angular.module('ChildCare')
        .factory('Session', session);

    /** @ngInject */
    function session($http, $q) {

        return {
            authorize: authorize,
            registerParent: registerParent,
            registerChild: registerChild
        };

        function authorize(data) {
            return makeRequest('POST', '/api/authorize', data);
        }

        function registerParent(data) {
            return makeRequest('POST', '/api/parent', data);
        }

        function registerChild(data) {
            return makeRequest('POST', '/api/child', data);
        }


        function makeRequest(method, url, data){
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
