/**
 * Created by George on 10/12/2015.
 */

gulp.task('serve', ['styles'], function () {
    var server = require('./src/server/server.js')();

    /* server.listen(port, function () {
     console.log('About to crank up Node');
     console.log('NODE_ENV = ' + environment);
     console.log('ChildCare App is running on Port ' + port);
     });*/

});


gulp.task('serve-build', /*['bundlejs'],*/ function () {
    serve(false /* isDev */);
});


gulp.task('serve-dev', ['inject'], function () {
    serve(true /* isDev */);
});