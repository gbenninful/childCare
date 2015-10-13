/**
 * Created by George on 10/12/2015.
 */

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
