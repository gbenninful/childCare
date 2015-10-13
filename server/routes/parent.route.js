var express = require('express');

module.exports = function () {

    var ParentRouter = express.Router();
    var Parent = require('../models/parent.model');
    ParentRouter.use('/:ParentId', oneMiddleWare);

    ParentRouter.route('/')
        .post(postOne)
        .get(getAll);

    ParentRouter.route('/:ParentId')
        .get(getOne)
        .put(putOne)
        .patch(patchOne)
        .delete(removeOne);

    //ParentRouter.route('/genre/')
    //    .get(getAllGenre);
    //
    //function getAllGenre(req, res) {
    //    //todo should return genre titles
    //    res.json([]);
    //}

    //ParentRouter.route('/genre/:genreName')
    //    .get(getOneGenre);
    //function getOneGenre(req, res) {
    //    var query = {genre: req.params.genreName};
    //
    //    Parent.find(query, function (err, user) {
    //        if (err) {
    //            res.status(500).send(err);
    //        } else {
    //            res.json(user);
    //        }
    //    });
    //}

    function postOne(req, res) {
        var user = new Parent(req.body);
        user.save();
        res.status(201).send(user);
    }

    function getAll(req, res) {
        var query = {};

        Parent.find(query, function (err, users) {
            if (err) {
                res.status(500).send(err);
            } else {
                var returnParents = [];
                users.forEach(function(element){
                    var newParent = element.toJSON();
                    newParent.links = {};
                    newParent.links.self = 'http://'+ req.headers.host + '/api/parent/' + newParent._id ;
                    returnParents.push(newParent);
                });
                res.json(returnParents);
            }
        });
    }

    function oneMiddleWare(req, res, next) {
        Parent.findById(req.params.ParentId, function (err, user) {
            if (err) {
                res.status(500).send(err);
            } else if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(400).send('No parent found.')
            }
        });
    }

    function getOne(req, res) {
        res.json(req.user);
    }

    function putOne(req, res) {
        req.user.firstName = req.body.firstName;
        req.user.middleName = req.body.middleName;
        req.user.lastName = req.body.lastName;
        req.user.dob = req.body.dob;
        req.user.active = req.body.active;

        req.user.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        });
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
                res.status(204).send('Parent removed');
            }
        });
    }

    return ParentRouter;
};