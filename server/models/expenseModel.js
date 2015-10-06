var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseModel = new Schema({
    expenseDate : { type : Date},
    category : { type : String },
    description : { type : String },
    amount : { type : Number },
    billable : { type : Boolean}
});

module.exports =  mongoose.model('Expense', expenseModel);