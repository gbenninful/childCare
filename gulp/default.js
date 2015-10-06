'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    taskListing = require('gulp-task-listing');

gulp.task('default', taskListing);
