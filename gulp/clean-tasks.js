/**
 * Created by George on 10/12/2015.
 */

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