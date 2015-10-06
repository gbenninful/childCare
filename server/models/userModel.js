var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    active: {type: Boolean, default: true},
    city: {type: String},
    cityCode: {type: String},
    role: {type: String},
    projects: {type: String},
    manages: {type: String},
    managedBy: {type: String}
});

module.exports = mongoose.model('User', userModel);

