(function () {
    'use strict';

    var express = require('express');
    var mongoose = require('mongoose');
    var bodyParser = require('body-parser');
    var app = express();
    var port = process.env.PORT || 4000;
    //var authorize = require('./routes/authorize.route')();
    var apartmentRoutes = require('./routes/apartment.route')();

    mongoose.connect('mongodb://localhost/childCare');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(express.static('./client'));
    app.use('/client', express.static('client'));
    app.use('/bower_components', express.static('bower_components'));
    app.get('/', function (req, res) {
        res.sendFile('./client/index.html');
    });

    app.get('/v1', function (req, res) {
        res.send('Welcome to Apartment Management API');
    });

   //app.use('/v1/authorize', authorize);
    app.use('/v1/apartment', apartmentRoutes);

    app.listen(port, function(){
        console.log('Server listening on port ', port);
    });
}());

