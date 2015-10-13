/**
 * Created by George on 10/12/2015.
 */

gulp.task('styles', ['clean-styles'], function () {
    log('Compiling Sass to CSS');

    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({browser: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});