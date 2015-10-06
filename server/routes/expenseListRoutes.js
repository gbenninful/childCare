var express = require('express');

module.exports = function () {

    var myList = [
        {name: 'Airfare'},
        {name: 'Car Rental'},
        {name: 'Cell Phone'},
        {name: 'Dues/Subscription'},
        {name: 'Employee Welfare'},
        {name: 'Job board'},
        {name: 'lodging'},
        {name: 'Meals/Entertainment-50%'},
        {name: 'Meals/Entertainment-100%'},
        {name: 'Mileage'},
        {name: 'Office Equipment'},
        {name: 'Office Furniture'},
        {name: 'Office Supplies'},
        {name: 'Parking/Taxi'},
        {name: 'Partner Expenses'},
        {name: 'Postage'},
        {name: 'Software'},
        {name: 'Other'}
    ];

    var expenseListRouter = express.Router();
    var ExpenseList = require('../models/expenseListModel');
    expenseListRouter.use('/:expenseListId', oneMiddleWare);

    expenseListRouter.route('/')
        .get(getAll)
        .post(postOne);

    expenseListRouter.route('/:expenseListId')
        .get(getOne)
        .put(putOne)
        .patch(patchOne)
        .delete(removeOne);


    function getAll(req, res) {
        ExpenseList.find(function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function postOne(req, res) {
        var expenseItem = new ExpenseList(req.body);
        expenseItem.save();
        res.status(201).send(expenseItem);
    }

    function oneMiddleWare(req, res, next) {
        ExpenseList.findById(req.params.expenseListId, function (err, expenseItem) {
            if (err) {
                res.status(500).send(err);
            } else if (expenseItem) {
                req.expenseItem = expenseItem;
                next();
            } else {
                res.status(400).send('Expense list item not found');
            }
        });
    }

    function getOne(req, res) {
        res.json(req.expenseItem);
    }

    function putOne(req, res) {
        req.expenseItem.name = req.body.name;
        req.expenseItem.active = req.body.active;

        req.expenseItem.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.expenseItem);
            }
        })

    }

    function patchOne(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var prop in req.body) {
            req.expenseItem[prop] = req.body[prop];
        }
        req.expenseItem.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.expenseItem);
            }
        });
    }

    function removeOne(req, res) {
        req.expenseItem.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Expense Item removed');
            }
        });
    }

    return expenseListRouter;
}