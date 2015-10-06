'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    $ = require('gulp-load-plugins')({
        lazy: true,
        camelize: true
    });

gulp.task('serve', function () {
    var isDev = true;
    var port = process.env.PORT || config.defaultPort;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('start', function () {
            console.log('starting nodemon')
        })
        .on('restart', function () {
            console.log('nodemon restarted')
        });
});
