'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({lazy: true});

gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(wiredep(config.modules))
        .pipe(gulp.dest(config.client));
});
