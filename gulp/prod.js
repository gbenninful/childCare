'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({
        lazy: true,
        camelize: true
    });

//only used when building assets for production
gulp.task('fonts', function () {
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.dist + 'fonts'));
});

//only used when building assets for production
gulp.task('images', function () {
    return gulp
        .src(config.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.dist + 'images'));
});


gulp.task('dist', ['fonts', 'images', 'build'], function () {
    var templateCache = config.temp + config.templateCache.file;
    var assets = $.useref.assets({searchPath: './'});

    return gulp.src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(assets)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.dist));

});