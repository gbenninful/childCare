'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({
        lazy: true,
        camelize: true
    });

gulp.task('browserify', function () {
    // Single entry point to browserify
    return gulp.src(config.js)
        .pipe($.concat('bundle.js'))
        .pipe($.browserify({
            insertGlobals: false,
            debug: false,
            transform: ['brfs']
        }))
        .pipe($.ngAnnotate())
        //.pipe($.uglify())
        .pipe(gulp.dest(config.temp));
});

