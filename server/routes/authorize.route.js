var express = require('express');

module.exports = function () {
    //TODO use passport for authentication
//
//    var childRouter = express.Router();
//    var Child = require('../models/child.model');
//    childRouter.use('/:childId', oneMiddleWare);
//
//    childRouter.route('/')
//        .get(getAll)
//        .post(postOne);
//
//    childRouter.route('/:childId')
//        .get(getOne)
//        .put(putOne)
//        .patch(patchOne)
//        .delete(removeOne);
//
//
//    function getAll(req, res) {
//        Child.find(function (err, list) {
//            if (err) {
//                res.status(500).send(err);
//            } else {
//                res.json(list);
//            }
//        });
//    }
//
//    function postOne(req, res) {
//        var user = new Child(req.body);
//        user.save();
//        res.status(201).send(user);
//    }
//
//    function oneMiddleWare(req, res, next) {
//        Child.findById(req.params.expenseId, function (err, user) {
//            if (err) {
//                res.status(500).send(err);
//            } else if (user) {
//                req.user = user;
//                next();
//            } else {
//                res.status(400).send('Child not found');
//            }
//        });
//    }
//
//    function getOne(req, res) {
//        res.json(req.user);
//    }
//
//    function putOne(req, res) {
//        req.user.firstName = req.body.firstName;
//        req.user.middleName = req.body.middleName;
//        req.user.lastName = req.body.lastName;
//        req.user.dob = req.body.dob;
//        req.user.active = req.body.active;
//
//        req.user.save(function (err) {
//            if (err) {
//                res.status(500).send(err);
//            } else {
//                res.json(req.user);
//            }
//        })
//
//    }
//
//    function patchOne(req, res) {
//        if (req.body._id) {
//            delete req.body._id;
//        }
//        for (var prop in req.body) {
//            req.user[prop] = req.body[prop];
//        }
//        req.user.save(function (err) {
//            if (err) {
//                res.status(500).send(err);
//            } else {
//                res.json(req.user);
//            }
//        });
//    }
//
//    function removeOne(req, res) {
//        req.user.remove(function (err) {
//            if (err) {
//                res.status(500).send(err);
//            } else {
//                res.status(204).send('Child removed');
//            }
//        });
//    }
//
//    return childRouter;
}