/**
 * Created by George on 9/26/2015.
 */
(function () {
    'use strict';

    module.exports = function() {
        var express = require('express'),
            app = express();

        app.use(express.static('./client'));

        app.get('/', function (req, res) {
            res.sendFile('./client/index.html');
        });

        return app;
    }

}());

