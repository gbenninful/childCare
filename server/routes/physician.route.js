var express = require('express');

module.exports = function () {

    var physicianRouter = express.Router();
    var Physician = require('../models/physician.model');
    physicianRouter.use('/:physicianId', oneMiddleWare);

    physicianRouter.route('/')
        .get(getAll)
        .post(postOne);

    physicianRouter.route('/:physicianId')
        .get(getOne)
        .put(putOne)
        .patch(patchOne)
        .delete(removeOne);


    function getAll(req, res) {
        Physician.find(function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function postOne(req, res) {
        var user = new Physician(req.body);
        user.save();
        res.status(201).send(user);
    }

    function oneMiddleWare(req, res, next) {
        Physician.findById(req.params.physicianId, function (err, user) {
            if (err) {
                res.status(500).send(err);
            } else if (user) {
                req.user = user;
                next();
            } else {
                res.status(400).send('Physician not found');
            }
        });
    }

    function getOne(req, res) {
        res.json(req.user);
    }

    function putOne(req, res) {
        req.user.name = req.body.name;
        req.user.active = req.body.active;

        req.user.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        })

    }

    function patchOne(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var prop in req.body) {
            req.user[prop] = req.body[prop];
        }
        req.user.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        });
    }

    function removeOne(req, res) {
        req.user.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Physician removed');
            }
        });
    }

    return physicianRouter;
}