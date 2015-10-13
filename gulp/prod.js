'use strict';

var gulp = require('gulp'),
    args = require('yargs').argv,
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({
        lazy: true,
        camelize: true
    });


gulp.task('fonts', function () {
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.dist + 'assets/fonts'));
});

gulp.task('images', function () {
    return gulp
        .src(config.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.dist + 'assets/images'));
});

// ['fonts']
gulp.task('dist', ['build'], function () {
    var templateCache = config.temp + config.templateCache.file;
    var assets = $.useref.assets({searchPath: './'});

    return gulp.src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest(config.dist))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.dist));
});