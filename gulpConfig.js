module.exports = function () {

    'use strict';

    var client = './client/',

        config = {
            index: client + 'index.html',
            // js: ['./client/app/*.js', './client/app/**/*.js'],

            //All JS to vet
            allJs: [
                './src/**/*.js',
                './*.js'
            ]
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