/**
 * Created by George on 10/12/2015.
 */

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function () {
    log('wire up the app css into the html, and call wiredep');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});