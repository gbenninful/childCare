/**
 * Created by George on 9/26/2015.
 */
module.exports = function () {
    'use strict';

    var client = './client/';

    var config = {
        alljs: ['./client/*.js', './client/src/**/*.js'],
        view: './client/index.html',
        index: './client/index.js',
        styles: './client/src/assets/styles/*.scss',
        tmp: './client/.tmp/',
        karmaConf: __dirname + '/karma.conf.js'
    };

    //config.getWiredepDefaultOptions = function () {
    //
    //    var options = {
    //        bowerJson: config.bower.json,
    //        directory: config.bower.directory,
    //        ignorePath: config.bower.ignorePath
    //    };
    //    return options;
    //
    //};

    return config;
};