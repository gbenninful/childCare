'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({lazy: true});


gulp.task('styles', function () {
    return gulp
        .src(config.styles)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe($.rename('styles.css'))
        .pipe(gulp.dest(config.tmp))
});
