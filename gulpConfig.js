module.exports = function () {
    'use strict';

    var client = './client/';

    var config = {
        client : client ,
        js: ['./client/*.js', './client/app/**/*.js', './client/app/**/*.js'],
        index: './client/index.html',
        styles: './client/assets/styles/*.scss',
        tmp: './client/.tmp/',
        karmaConf: __dirname + '/karma.conf.js',
        bower: {
            json : require('./package.json'),
            directory:('./node_modules/'),
            ignorePath : '../../client/'
        }
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};