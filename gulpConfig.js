/**
 * Created by George on 9/26/2015.
 */
module.export = function(){
    "use strict";

    var client = './client/';

    var config = {
        index: client + 'index.html',
        js: ['./client/app/*.js', './client/app/**/*.js']
    };

    config.getWiredepDefaultOptions = function(){

        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;

    };

    return config;
}