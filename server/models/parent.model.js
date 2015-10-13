var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parent = new Schema({
    firstName: {type: String},
    middleName: {type: String},
    lastName: {type: String},
    dob: {type: String},
    active: {type: Boolean, default: true},
    phone: [
        {
            type: {type: String, default: 'home'},
            number: {type: String}
        }
    ],
    address: [
        {
            type: {type: String, default: 'home'},
            active: {type: Boolean, default: true},
            line1: {type: String},
            line2: {type: String},
            city: {type: String},
            state: {type: String},
            zipCode: {type: Number},
            country: {type: String}
        }
    ]
});

module.exports = mongoose.model('Parent', parent);

