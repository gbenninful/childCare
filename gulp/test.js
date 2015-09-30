'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')();

gulp.task('test', function (done) {
    var karmaServer = require('karma').Server;

    new karmaServer({
        configFile: config.karmaConf,
        singleRun: true
    }, function () {
        done
    }).start();
});
