/**
 * Created by George on 9/26/2015.
 */
(function () {
    'use strict';

    module.exports = function () {
        var express = require('express');
        var app = express();

        app.use(express.static('./client'));
        app.use('/client', express.static('client'));
        app.use('/node_modules', express.static('node_modules'));

        app.get('/', function (req, res) {
            res.sendFile('./client/index.html');
        });

        return app;
    }

}());

