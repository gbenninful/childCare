(function () {
    'use strict';

    var express = require('express');
    var mongoose = require('mongoose');
    var bodyParser = require('body-parser');
    var app = express();
    var port = process.env.PORT || 6000;
    var bookRouter = require('./routes/bookRoutes')();
    var userRouter = require('./routes/userRoutes')();
    var projectRouter = require('./routes/projectRoutes')();
    var expenseRouter = require('./routes/expenseRoutes')();
    var expenseListRouter = require('./routes/expenseListRoutes')();

    mongoose.connect('mongodb://localhost/bookAPI');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(express.static('./client'));
    app.use('/client', express.static('client'));
    app.use('/bower_components', express.static('bower_components'));

    app.get('/', function (req, res) {
        res.sendFile('./client/index.html');
    });

    app.get('/api', function (req, res) {
        res.send('Welcome to my API');
    });

    app.use('/api/books', bookRouter);
    app.use('/api/project', projectRouter);
    app.use('/api/user', userRouter);
    app.use('/api/expense', expenseRouter);
    app.use('/api/expenseList', expenseListRouter);

    app.listen(port, function(){
        console.log('listening on port ', port);
    });
}());

