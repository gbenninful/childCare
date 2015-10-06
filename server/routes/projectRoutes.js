var express = require('express');

module.exports = function () {

    var projectRouter = express.Router();
    var Project = require('../models/projectModel');
    projectRouter.use('/:projectId', oneMiddleWare);

    projectRouter.route('/')
        .get(getAll)
        .post(postOne);

    projectRouter.route('/:projectId')
        .get(getOne)
        .put(putOne)
        .patch(patchOne)
        .delete(removeOne);


    function getAll(req, res) {
        Project.find(function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function postOne(req, res) {
        var project = new Project(req.body);
        project.save();
        res.status(201).send(project);
    }

    function oneMiddleWare(req, res, next) {
        Project.findById(req.params.projectId, function (err, project) {
            if (err) {
                res.status(500).send(err);
            } else if (project) {
                req.project = project;
                next();
            } else {
                res.status(400).send('Project not found');
            }
        });
    }

    function getOne(req, res) {
        res.json(req.project);
    }

    function putOne(req, res) {
        req.project.name = req.body.name;
        req.project.city = req.body.city;
        req.project.cityCode = req.body.cityCode;
        req.project.users = req.body.users;
        req.project.managedBy = req.body.managedBy;
        req.project.active = req.body.active;

        req.project.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.project);
            }
        })

    }

    function patchOne(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var prop in req.body) {
            req.project[prop] = req.body[prop];
        }
        req.project.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.project);
            }
        });
    }

    function removeOne(req, res) {
        req.project.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Project removed');
            }
        });
    }

    return projectRouter;
}