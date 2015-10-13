(function () {
    'use strict';


    module.exports = function () {
        var express = require('express'),
            app = express(),
            bodyParser = require('body-parser'),
            environment = process.env.NODE_ENV,
            logger = require('morgan'),
            mongoose = require('mongoose'),
            port = process.env.PORT || 3000;

       /* app.use(express.static('./src/client'));
        app.use(express.static('./'));
        app.use('/.tmp', express.static('.tmp'));
        app.use('/bower_components', express.static('bower_components'));
        app.get('/', function (req, res) {
            res.sendFile('./src/client/index.html');
        });*/

        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(logger('dev'));

        console.log('About to crank up node');
        console.log('PORT = ' + port);
        //console.log('NODE_ENV = ' + environment);


        mongoose.connect('mongodb://localhost/childCare');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error...'));
        db.once('open', function callback() {
            console.log('childCare db is opened');
        });

        var messageSchema = mongoose.Schema({message: String}),
            Message = mongoose.model('Message', messageSchema),
            mongoMessage;
        Message.findOne().exec(function (err, messageDoc) {
            // mongoMessage = messageDoc.message;
        });


         /* app.get('/api', function(req, res) {
         //res.render('index');
         res.send('api page');
         });*/

        switch (environment) {
            case 'build':
                console.log('*** BUILD ***');
                console.log('Environment: ', environment);
                app.use(express.static('./build/'));
                app.use('/*', express.static('build/index.html'));
                break;
            default:
                console.log('*** DEV ***');
                console.log('Environment: ', environment);
                app.use(express.static('./src/client/'));
                app.use(express.static('./'));
                app.use(express.static('./tmp'));
                app.use(express.static('./src/client/index.html'));
                break;
        }


        app.listen(port, function () {
         console.log('Express server listening on port ' + port);
         console.log('Env = ' + app.get('env') +
         '\n__dirname = ' + __dirname +
         '\nprocess.cwd = ' + process.cwd());

         });

        return app;
    };

}());

