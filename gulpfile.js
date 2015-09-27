/**
 * Created by George on 9/26/2015.
 */

(function () {
    "use strict";

    var gulp = require('gulp'),
        wiredep = require('wiredep').stream,
        config = require('./gulpConfig.js'),
        $ = require('gulp-load-plugins')({lazy: true});

    gulp.task('wiredep', function () {

        var options = config.getWiredepDefaultOptions();

        return gulp
            .src(config.index)
            .pipe(wiredep(options))
            .pipe($.inject(gulp.src(config.js)))
            .pipe(gulp.dest(config.client));
    });

    gulp.task('server', function(){

            var express = require('express'),
                app = express(),
                nodemon = require('nodemon'),
                path = require('path');

            app.use(express.static('./client'));
            app.use(express.static('./node_modules'));
            app.get('/', function (req, res) {

                res.sendFile('./client/index.html');

            });


            app.listen(3000, function () {
                console.log('Child Care App is running on Port 3000');
            });

    });

    gulp.task('build', ['wiredep', 'server']);


}());