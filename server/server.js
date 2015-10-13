(function () {
    'use strict';

    var express = require('express');
    var mongoose = require('mongoose');
    var bodyParser = require('body-parser');
    var app = express();
    var port = process.env.PORT || 4000;
    mongoose.connect('mongodb://localhost/childCare');

    //var authorize = require('./routes/authorize.route')();
    var childRoutes = require('./routes/child.route')();
    var caretakerRoutes = require('./routes/caretaker.route')();
    var parentRoutes = require('./routes/parent.route')();
    var physicianRoutes = require('./routes/physician.route')();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(express.static('./client'));
    app.use('/client', express.static('client'));
    app.use('/bower_components', express.static('bower_components'));
    app.get('/', function (req, res) {
        res.sendFile('./client/index.html');
    });

    app.get('/api', function (req, res) {
        res.send('Welcome to Child Care API');
    });
    //app.use('/api/authorize', authorize);
    app.use('/api/child', childRoutes);
    app.use('/api/caretaker', caretakerRoutes);
    app.use('/api/parent', parentRoutes);
    app.use('/api/physician', physicianRoutes);

    app.listen(port, function(){
        console.log('Server listening on port ', port);
    });
}());

