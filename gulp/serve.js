'use strict';

var gulp = require('gulp');

gulp.task('serve', function () {
    var server = require('../server/server.js')();
    server.listen(3000, function () {
        console.log('Child Care App is now running on Port 3000');
    });
});
