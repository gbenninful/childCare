/**
 * Created by George on 10/12/2015.
 */

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * -- type=patch or no flag will bump the patch version *.*.x
 * -- type=minor will bump the minor version *.x.*
 * -- type=major will bump the major version x.*.*
 * -- version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function () {
    var msg = 'Bumping versions',
        options = {},
        type = args.type,
        version = args.version;

    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }
    log(msg);

    return gulp
        .src(config.packages)
        .pipe($.print)
        .pipe($.bump(options))
        .pipe(gulp.dest(config.root));
});