'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({lazy: true});

gulp.task('clean', function (done) {
    var del = require('del');
    if (config.dist) {
        del(config.temp);
    }

    if (config.dist) {
        del(config.dist);
    }
    done();
});


