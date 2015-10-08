'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({lazy: true});

gulp.task('inject', function () {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.temp + '*.css')))
        .pipe($.inject(gulp.src(config.temp + '*.js')))
        .pipe(gulp.dest(config.client));
});

