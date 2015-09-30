'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({lazy: true});


gulp.task('clean', function () {
    var del = require('del');
    del(config.tmp);
});
