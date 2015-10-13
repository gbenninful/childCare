'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({
        lazy: true,
        camelize: true
    });

gulp.task('templatecache', function () {
    return gulp
        .src(config.html)
        .pipe($.minifyHtml({ empty:true}))
        .pipe($.angularTemplatecache(config.templateCache.file, config.templateCache.options))
        .pipe($.uglify())
        .pipe(gulp.dest(config.temp));
});




