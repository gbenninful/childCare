'use strict';

var gulp = require('gulp'),
    args = require('yargs').argv,
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({lazy: true});


gulp.task('lint', function () {
    return gulp
        .src(config.alljs)
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'))
        .pipe($.jshint.reporter('fail'));
});
