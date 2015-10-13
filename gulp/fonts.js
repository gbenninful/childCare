/**
 * Created by George on 10/12/2015.
 */

gulp.task('fonts', ['clean-fonts'], function () {
    log('Copying fonts to build folder');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});