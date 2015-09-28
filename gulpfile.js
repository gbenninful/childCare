/**
 * Created by George on 9/26/2015.
 */

//TODO: Add minify, clean and watch(restart server on js file change ) tasks

(function () {
    'use strict';

    var gulp = require('gulp'),
        config = require('./gulpConfig.js'),
        $ = require('gulp-load-plugins')();


    gulp.task('serve', function () {
        var server = require('./server/server.js')();
        server.listen(3000, function () {
            console.log('Child Care App is now running on Port 3000');
        });
    });

    gulp.task('build', function () {
        // Single entry point to browserify
        gulp.src('./client/index.js')
            .pipe($.browserify({
                insertGlobals: true
            }))
            .pipe($.rename('bundle.js'))
            .pipe(gulp.dest('./client/.tmp/'))
    });

    gulp.task('test', function(done){
        var karmaServer = require('karma').Server;

        new karmaServer({
            configFile: __dirname + '/karma.conf.js',
            singleRun : true
        }, function(){
            done
        }).start();
    });



}());