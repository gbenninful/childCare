'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    args = require('yargs').argv,
    $ = require('gulp-load-plugins')({lazy: true});

gulp.task('lint', function () {
    return gulp
        .src(config.js)
        .pipe($.jscs())
        //.pipe($.jscs.reporter())
        .pipe($.jshint())
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
        //.pipe($.jshint.reporter('fail'));
});

