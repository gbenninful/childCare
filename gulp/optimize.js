/**
 * Created by George on 10/12/2015.
 */

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
