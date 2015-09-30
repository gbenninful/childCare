
(function () {
    'use strict';

    module.exports = function() {
        var express = require('express'),
            app = express();

        app.use(express.static('./src/client'));
        app.use('/bower_components', express.static('bower_components'));

        app.get('/', function (req, res) {
            res.sendFile('./src/client/index.html');
        });

        return app;
    };

}());

