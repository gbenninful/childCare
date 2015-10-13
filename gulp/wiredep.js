/**
 * Created by George on 10/12/2015.
 */

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