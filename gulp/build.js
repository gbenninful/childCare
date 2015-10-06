'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({
        lazy: true,
        camelize: true
    });

//runSequence('clean', 'lint', 'browserify',  'styles', 'wiredep','inject', 'serve');

gulp.task('build', ['clean', 'browserify', 'lint', 'styles', 'wiredep'], function () {
    gulp.start('inject', 'serve');
});
