/**
 * Created by George on 10/12/2015.
 */

gulp.task('sass-watcher', function () {
    gulp.watch([config.sass], ['styles']);
});
