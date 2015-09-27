/**
 * Created by George on 9/26/2015.
 */

//TODO: Add minify, clean and watch(restart server on js file change ) tasks

(function () {
    "use strict";

    var gulp = require('gulp'),
        config = require('./gulpConfig.js'),
        $ = require('gulp-load-plugins')({lazy: true});


    gulp.task('serve', function () {
        var express = require('express'),
            app = express(),
            path = require('path');

        app.use(express.static('./client'));

        app.get('/', function (req, res) {
            res.sendFile('./client/index.html');
        });

        app.listen(3000, function () {
            console.log('Child Care App is running on Port 3000');
        });
    });

    gulp.task('browserify', function () {
        var rename = require('gulp-rename'),
            browserify = require('gulp-browserify');

        // Single entry point to browserify
        gulp.src('./client/index.js')
            .pipe(browserify({
                insertGlobals: true
            }))
            .pipe(rename('bundle.js'))
            .pipe(gulp.dest('./client/'))
    });

    gulp.task('build', ['browserify', 'serve']);


}());