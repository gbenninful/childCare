var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectModel = new Schema({
    name: {type: String},
    city: {type: String},
    cityCode: {type: String},
    users: {type: String},
    managedBy: {type: String},
    active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Project', projectModel);
