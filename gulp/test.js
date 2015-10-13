'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')();

gulp.task('test', function (done) {
    //var karmaServer = require('karma').Server;
    //
    //new karmaServer({
    //    configFile: config.karmaConf,
    //    singleRun: true
    //}, function () {
    //    done();
    //}).start();

    var karmaServer = require('karma').server;

    karmaServer.start({
        config: config.karmaConf,
        singleRun: true
    }, function () {
    }, function (result) {
        if (result === 1) {
            done('Test failed with code ', result);
        } else {
            console.log('test completed');
            done();
        }
    });
});
