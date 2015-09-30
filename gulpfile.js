//TODO(George): Add minify, clean and watch(restart server on js file change ) tasks

(function () {
    'use strict';

    var gulp = require('gulp'),
        args = require('yargs').argv,
        config = require('./gulpConfig')(),
        $ = require('gulp-load-plugins')({lazy: true});

    gulp.task('vet', function () {
        log('Analyzing source with JSHint and JSCS');

        return gulp
            .src(config.allJs)
            .pipe($.if(args.verbose, $.print())) //TODO (George): Investigate why gulp-print doesn't seem to be working
           // .pipe($.jscs())
            //.pipe($.jscs.reporter())
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
        //.pipe(jshint.reporter('fail'));
    });

    gulp.task('serve', function () {
        var server = require('./src/server/server.js')();
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
            .pipe(gulp.dest('./client/.tmp/'));
    });

    gulp.task('run', ['build'], function () {
        var server = require('./src/server/server.js')();
        server.listen(3000, function () {
            console.log('Server running on port 3000');
        });
    });


    gulp.task('test', function (done) {
        var karmaServer = require('karma').Server;

        new karmaServer({ //Todo (Jeff): JShint- A constructor name should start with an uppercase letter. (W055)
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, function () {
            done;       //Todo (Jeff): Jshint- Expected an assignment or function call and instead saw an expression. (W030)
        }).start();
    });


    /////////
    function log(msg) {
        if (typeof (msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    }

}());