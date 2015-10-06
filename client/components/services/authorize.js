(function () {
    'use strict';

    angular.module('ChildCare')
        .factory('authorization', authorization);

    /** @ngInject */
    function authorization() {

        var credentials = require('../server/config.json');
        //var oauth2 = require('simple-oauth2')(credentials.microsoft);
        //var redirectUri = "http://localhost:4000/authorize";
        //var scope = ['openid', 'https://outlook.office.com/mail.read'];


        console.log('microsoft', credentials.microsoft);

        return {
            getAuthUrl: getAuthUrl,
            login: login,
            logout: logout
        };

        function login() {
            console.log('login called', credentials);
        }

        function logout() {
            console.log('logout called');
        }

        function getAuthUrl() {

        }


    }
})();