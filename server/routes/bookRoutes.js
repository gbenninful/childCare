var express = require('express');

module.exports = function () {

    var bookRouter = express.Router();
    var Book = require('../models/bookModel');
    bookRouter.use('/:bookId', oneMiddleWare);

    bookRouter.route('/')
        .post(postOne)
        .get(getAll);

    bookRouter.route('/:bookId')
        .get(getOne)
        .put(putOne)
        .patch(patchOne)
        .delete(removeOne);

    bookRouter.route('/genre/')
        .get(getAllGenre);

    bookRouter.route('/genre/:genreName')
        .get(getOneGenre);


    function postOne(req, res) {
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book);
    }

    function getAll(req, res) {
        var query = {};

        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                var returnBooks = [];
                books.forEach(function(element){
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://'+ req.headers.host + '/api/books/' + newBook._id ;
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);
            }
        });
    }

    function oneMiddleWare(req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(400).send('No book found.')
            }
        });
    }

    function getOne(req, res) {
        res.json(req.book);
    }

    function putOne(req, res) {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;

        req.book.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });
    }

    function patchOne(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var prop in req.body) {
            req.book[prop] = req.body[prop];
        }
        req.book.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });
    }

    function removeOne(req, res) {
        req.book.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Rook removed');
            }
        });
    }

    function getAllGenre(req, res) {
        //todo should return genre titles
        res.json([]);
    }

    function getOneGenre(req, res) {
        var query = {genre: req.params.genreName};

        Book.find(query, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        });
    }

    return bookRouter;
}