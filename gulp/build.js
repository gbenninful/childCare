'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence').use(gulp),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({
        lazy: true,
        camelize: true
    });

gulp.task('build', function (done) {
    runSequence('clean', 'lint', 'browserify', 'styles', 'wiredep', 'inject', 'serve', done);
});
