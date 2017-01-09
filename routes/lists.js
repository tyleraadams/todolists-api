"use strict";
var express = require('express');
var router = express.Router();
const List = require('../models/database').List;
// const Todo = require('../models/database').Todo;
/* GET all lists. */
router.get('/', function(req, res, next) {
 List.fetchAll().then((lists) => {
    const response = {};
    response.status = 200;
    response.count = lists.length;
    const promises = lists.map(list => new List({id: list.id}).fetch({withRelated:['todos']}).then( resultingList => Object.assign({}, resultingList.attributes, { todos: resultingList.related('todos').toJSON() }) ) )

      Promise.all(promises).then((values) => {
        response.result = values;
        res.send(response);
      })
  });
});

router.get('/:id', (req, res, next) => {
  new List({id: req.params.id}).fetch().then((list) => {
    const response = {};
    response.status = 200;
    response.count = 1;
    response.result = list;
    res.send(response);
  })
});

router.get('/:id/todos', (req, res, next) => {
  new List({id: req.params.id}).fetch({withRelated:['todos']}).then((list) => {
    const response = {};
    const todos = list.related('todos').toJSON();
    response.status = 200;
    response.count = todos.length;
    response.result = todos;
    res.send(response);
  })
});

module.exports = router;
