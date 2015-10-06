var express = require('express');

module.exports = function () {

    var expenseRouter = express.Router();
    var Expense = require('../models/expenseModel');
    expenseRouter.use('/:expenseId', oneMiddleWare);

    expenseRouter.route('/')
        .get(getAll)
        .post(postOne);

    expenseRouter.route('/:expenseId')
        .get(getOne)
        .put(putOne)
        .patch(patchOne)
        .delete(removeOne);


    function getAll(req, res) {
        Expense.find(function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function postOne(req, res) {
        var expenseItem = new Expense(req.body);
        expenseItem.save();
        res.status(201).send(expenseItem);
    }

    function oneMiddleWare(req, res, next) {
        Expense.findById(req.params.expenseId, function (err, expenseItem) {
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

    return expenseRouter;
}