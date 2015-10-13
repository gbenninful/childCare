/**
 * Created by George on 10/12/2015.
 */

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