'use strict';

var gulp = require('gulp'),
    config = require('../gulpConfig')(),
    browserSync = require('browser-sync'),
    args = require('yargs').argv,
    port = process.env.PORT || config.defaultPort,
    $ = require('gulp-load-plugins')({
        lazy: true,
        camelize: true
    });

gulp.task('serve', ['build'], function () {
    var isDev = true;
    var nodemonOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    gulp.watch(config.html, ['templatecache']);
    gulp.watch(config.css, ['styles']);
    gulp.watch(config.js, ['lint', 'browserify']);

    return $.nodemon(nodemonOptions)
        .on('start', function () {
            startBrowserSync();
        })
        .on('restart', function () {
            setTimeout(function () {
                browserSync.notify('Reloading now....');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('crash', function () {
            console.log('Nodemon crashed...');
        })
        .on('exit', function () {
            console.log('Exiting nodemon...');
        });
});


function startBrowserSync() {
    if (args.nosync || browserSync.active) {
        return;
    }
    var options = {
        proxy: 'localhost:' + port,
        port: 8000,
        files: [config.client],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: false,
        //logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0
    };

    browserSync(options);
}

