/**
 * Created by George on 10/12/2015.
 */

gulp.task('test', function (done) {
    var karmaServer = require('karma').Server;

    new karmaServer({ //Todo (Jeff): Jshint- A constructor name should start with an uppercase letter. (W055)
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function () {
        done;       //Todo (Jeff): Jshint- Expected an assignment or function call and instead saw an expression. (W030)
    }).start();
});