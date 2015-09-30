'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({
        lazy: true,
        camelize: true
    });

gulp.task('browserify', ['clean'], function () {
    // Single entry point to browserify
    gulp.src(config.index)
        .pipe($.browserify({
            insertGlobals: true
        }))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe($.rename('bundle.js'))
        .pipe(gulp.dest(config.tmp));
});
