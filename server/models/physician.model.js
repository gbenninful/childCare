var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var physician = new Schema({
    firstName: {type: String},
    middleName: {type: String},
    lastName: {type: String},
    title: {type: String},
    phone: [
        {
            type: String, default: 'office',
            number: {type: String}
        },
        {
            type: String, default: 'home',
            number: {type: String}
        }
    ],
    active: {type: Boolean, default: true},
    address: [
        {
            type: {type: String, default: 'office'},
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

module.exports = mongoose.model('Physician', physician);

