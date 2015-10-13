/**
 * Created by George on 10/12/2015.
 */

gulp.task('bundlejs', function () {
    log('Concatenating, annotating and minifying all our custom JS files');
    return gulp
        .src(config.allJs)
        .pipe($.concat('bundle.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest(config.build));
});