/**
 * Created by George on 9/26/2015.
 */
(function () {
    "use strict";

    var express = require('express'),
        app = express(),
        nodemon = require('nodemon'),
        path = require('path');

    app.use(express.static('./'));
    app.get('/', function (req, res) {

        res.sendFile('./client/index.html');

    });


    app.listen(3000, function () {
        console.log('Child Care App is running on Port 3000');
    });


}());