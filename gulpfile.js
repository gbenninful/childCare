/**
 * Created by George on 9/26/2015.
 */

//TODO: Add minify, and watch(restart server on js file change ) tasks

(function () {
    'use strict';

    var gulp = require('gulp'),
        wrench = require('wrench');

    wrench.readdirSyncRecursive('./gulp').map(function(file){
       require('./gulp/'+ file);
    });


    gulp.task('build', ['clean', 'styles', 'browserify', 'lint']);


}());