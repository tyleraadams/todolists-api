"use strict";
var express = require('express');
var router = express.Router();
const Todo = require('../models/database').Todo;
/* GET all lists. */
// router.get('/', function(req, res, next) {
//  List.fetchAll().then((lists) => {
//     const response = {};
//     response.status = 200;
//     response.count = lists.length;
//     const promises = lists.map(list => new List({id: list.id}).fetch({withRelated:['todos']}).then( resultingList => Object.assign({}, resultingList.attributes, { todos: resultingList.related('todos').toJSON() }) ) )

//       Promise.all(promises).then((values) => {
//         response.result = values;
//         res.send(response);
//       })
//   });
// });

router.get('/:id', (req, res, next) => {
  new Todo({id: req.params.id}).fetch().then((todo) => {
    const response = {};
    response.status = 200;
    response.count = 1;
    response.result = todo;
    res.send(response);
  })
});

router.put('/:id', (req, res, next) => {

  new Todo({id: req.params.id}).save({isComplete: req.body.isComplete, updated_at: new Date().toISOString()}, {patch: true}).then((todoModel) => {
    const response = {};
    todoModel.fetch().then((todo) => {
      response.status = 200;
      response.count = 1;
      response.result = todo.attributes;
      res.send(response);
    });
  }).catch(err=> console.error(err))
});

module.exports = router;
