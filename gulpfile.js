//TODO(George): Add minify, clean and watch(restart server on js file change ) tasks

(function () {
    'use strict';

    var gulp = require('gulp'),
        args = require('yargs').argv,
        browserSync = require('browser-sync'),
        config = require('./gulpConfig')(),
        del = require('del'),
        environment = process.env.NODE_ENV,
        minifycss = require('gulp-minify-css'),
        $ = require('gulp-load-plugins')({lazy: true, camelize: true}),
        port = process.env.PORT || config.defaultPort;


    gulp.task('build', function () {
        /* // Single entry point to browserify
         gulp.src('./client/index.js')
         .pipe($.browserify({
         insertGlobals: true
         }))
         .pipe($.rename('bundle.js'))
         .pipe(gulp.dest('./client/.tmp/'));*/
    });


    /**
     * Bump the version
     * --type=pre will bump the prerelease version *.*.*-x
     * -- type=patch or no flag will bump the patch version *.*.x
     * -- type=minor will bump the minor version *.x.*
     * -- type=major will bump the major version x.*.*
     * -- version=1.2.3 will bump to a specific version and ignore other flags
     */
    gulp.task('bump', function () {
        var msg = 'Bumping versions',
            options = {},
            type = args.type,
            version = args.version;

        if (version) {
            options.version = version;
            msg += ' to ' + version;
        } else {
            options.type = type;
            msg += ' for a ' + type;
        }
        log(msg);

        return gulp
            .src(config.packages)
            .pipe($.print)
            .pipe($.bump(options))
            .pipe(gulp.dest(config.root));
    });


    gulp.task('bundlejs', function () {
        log('Concatenating, annotating and minifying all our custom JS files');
        return gulp
            .src(config.allJs)
            .pipe($.concat('bundle.js'))
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe(gulp.dest(config.build));
    });


    gulp.task('clean', function (done) {
        var delconfig = [].concat(config.build, config.temp);
        log('Cleaning: ' + $.util.colors.blue(delconfig));
        del(delconfig, done());
    });


    gulp.task('clean-code', function (done) {
        var files = [].concat(
            config.temp + '**/*.js',
            config.build + '**/*.html',
            config.build + 'js/**/*.js'
        );
        clean(files, done);
    });


    gulp.task('clean-fonts', function (done) {
        clean(config.build + 'fonts/**/*.*', done);
    });


    gulp.task('clean-images', function (done) {
        clean(config.build + 'images/**/*.*', done);
    });


    gulp.task('clean-styles', function (done) {
        clean(config.temp + '**/*.css', done);
    });


    gulp.task('default', ['help']);


    gulp.task('help', $.taskListing);


    gulp.task('fonts', ['clean-fonts'], function () {
        log('Copying fonts to build folder');

        return gulp
            .src(config.fonts)
            .pipe(gulp.dest(config.build + 'fonts'));
    });


    gulp.task('images', ['clean-images'], function () {
        log('Copying and compressing images');

        return gulp
            .src(config.images)
            .pipe($.imagemin({optimizationLevel: 4}))
            .pipe(gulp.dest(config.build + 'images'));
    });


    gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function () {
        log('wire up the app css into the html, and call wiredep');

        return gulp
            .src(config.index)
            .pipe($.inject(gulp.src(config.css)))
            .pipe(gulp.dest(config.client));
    });


    gulp.task('lint', function () {
        log('Analyzing source with JSHint and JSCS');

        return gulp
            .src(config.allJs)
            .pipe($.ngAnnotate())
            .pipe($.if(args.verbose, $.print()))
            //.pipe($.jscs())
            //.pipe($.jscs.reporter())
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
        //.pipe(jshint.reporter('fail'));
    });


    gulp.task('optimize', ['inject'/*, 'fonts', 'images'*/], function () {
        log('Optimizing the JavaScript, CSS and HTML files');

        var assets = $.useref.assets({searchPath: './'}),
            cssFilter = $.filter('**/*.css', {restore: true, passthrough: false}),
            jsLibFilter = $.filter('**/' + config.optimized.lib),
            jsAppFilter = $.filter('**/' + config.optimized.app),
            templateCache = config.temp + config.templateCache.file;

        return gulp
            .src(config.index)
            .pipe($.plumber())
            .pipe($.inject(gulp.src(templateCache, {read: false}), {
                starttag: '<!-- inject:templates:js -->'
            }))
            .pipe(assets)
           // .pipe(cssFilter)
            .pipe($.if('*.css', $.csso()))
           // .pipe(jsLibFilter)
           // .pipe(jsAppFilter)
            .pipe($.if('*.js', $.ngAnnotate()))
            .pipe($.if('*.js', $.uglify()))
            .pipe($.rev())
            .pipe(assets.restore())
            .pipe($.useref())
           // .pipe($.revReplace())
            .pipe(gulp.dest(config.build))
            .pipe($.rev.manifest())
            .pipe(gulp.dest(config.build));
    });


    gulp.task('run', ['build'], function () {
        /*var server = require('./src/server/server.js')();
         server.listen(3000, function () {
         console.log('Server running on port 3000');
         });*/
    });


    gulp.task('sass-watcher', function () {
        gulp.watch([config.sass], ['styles']);
    });


    gulp.task('serve', ['styles'], function () {
        var server = require('./src/server/server.js')();

        /* server.listen(port, function () {
         console.log('About to crank up Node');
         console.log('NODE_ENV = ' + environment);
         console.log('ChildCare App is running on Port ' + port);
         });*/

    });


    gulp.task('serve-build', /*['bundlejs'],*/ function () {
        serve(false /* isDev */);
    });


    gulp.task('serve-dev', ['inject'], function () {
        serve(true /* isDev */);
    });


    gulp.task('styles', ['clean-styles'], function () {
        log('Compiling Sass to CSS');

        return gulp
            .src(config.sass)
            .pipe($.plumber())
            .pipe($.sass())
            .pipe($.autoprefixer({browser: ['last 2 version', '> 5%']}))
            .pipe(gulp.dest(config.temp));
    });


    gulp.task('templatecache', ['clean-code'], function () {
        log('Creating AngularJS $templateCache');

        return gulp
            .src(config.htmltemplates)
            .pipe($.minifyHtml({empty: true}))
            .pipe($.angularTemplatecache(
                config.templateCache.file,
                config.templateCache.options
            ))
            .pipe(gulp.dest(config.temp));
    });


    gulp.task('test', function (done) {
        var karmaServer = require('karma').Server;

        new karmaServer({ //Todo (Jeff): Jshint- A constructor name should start with an uppercase letter. (W055)
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, function () {
            done;       //Todo (Jeff): Jshint- Expected an assignment or function call and instead saw an expression. (W030)
        }).start();
    });


    gulp.task('wiredep', function () {
        log('Wire up the bower css and our app js into the html');
        var options = config.getWiredepDefaultOptions(),
            wiredep = require('wiredep').stream;

        return gulp
            .src(config.index)
            .pipe(wiredep(options))
            .pipe($.inject(gulp.src(config.js)))
            .pipe(gulp.dest(config.client));
    });


    /////////

    function changeEvent(event) {
        var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
        log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }

    function clean(path, done) {
        log('Cleaning: ' + $.util.colors.blue(path));
        del(path, done());
    }

    function errorLogger(error) {

        /* log('Value of this 1: ' + this);
         log('*** Start of Error ***');
         log(error);
         log('*** End of Error ***');
         this.emit.bind(this, 'end');
         log('Value of this 2: ' + this);*/
    }

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


    function serve(isDev) {
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
            .on('restart', function (event) {
                log('*** Nodemon restarted ***');
                log('files changed on restart:\n' + event);
                setTimeout(function () {
                    browserSync.notify('Reloading now ...');
                    browserSync.reload({stream: false});
                }, config.browserReloadDelay);
            })
            .on('start', function () {
                log('*** Nodemon started ***');
                startBrowserSync(isDev);
            })
            .on('crash', function () {
                log('*** Nodemon crashed: script crashed for some reason ***');
            })
            .on('exit', function () {
                log('*** Nodemon exited cleanly ***');
            });
    }

    function startBrowserSync(isDev) {
        if (args.nosync || browserSync.active) {
            return;
        }

        log('Starting borwser-sync on port ' + port);

        if (isDev) {
            gulp.watch([config.sass], ['styles'])
                .on('change', function (event) {
                    changeEvent(event);
                });
        } else {
            gulp.watch([config.sass, config.js, config.html], ['optimize', browserSync.reload])
                .on('change', function (event) {
                    changeEvent(event);
                });
        }


        var options = {
            proxy: 'localhost:' + port,
            port: 5000,
            files: isDev ? [
                config.client + '**/*.*',
                config.temp + '**/*.css',
                '!' + config.sass
            ] : [],
            ghostMode: {
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'debug',
            logPrefix: 'gulp-patterns',
            modify: true,
            reloadDelay: 0  //1000
        };

        browserSync(options);
    }
}());