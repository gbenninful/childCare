var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseListModel = new Schema({
    name: {type: String},
    active: {type: Boolean, default: true}
});

module.exports = mongoose.model('ExpenseList', expenseListModel);

