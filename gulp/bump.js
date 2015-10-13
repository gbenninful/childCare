'use strict';

var gulp = require('gulp'),
    args = require('yargs').argv,
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({
        lazy: true,
        camelize: true
    });

gulp.task('bump', function () {
    var type = args.type;
    var version = args.version;
    var options = {};

    if (version) {
        options.version = version;
    } else {
        options.type = type;
    }

    return gulp
        .src(config.packages)
        .pipe($.bump(options))
        .pipe(gulp.dest(config.root));
});
