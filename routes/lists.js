"use strict";
const express = require('express');
const router = express.Router();
const List = require('../models/database').List;
const convertCaseOfKeys = require('../lib/utils/convert_case').convertCaseOfKeys;

/* GET all lists. */

router.get('/', function(req, res, next) {
 List.query(function(qb) {
    //qb is knex query builder, use knex function here
    qb.offset(0).limit(20).orderBy('updated_at','DESC');
  }).fetchAll().then(lists => {
    const response = {};
    response.status = 200;
    response.count = lists.length;
    const promises = lists.map(list => new List({ id: list.id })
      .fetch({withRelated:['todos']})
      .then( resultingList => {
        return Object.assign({}, convertCaseOfKeys(resultingList.attributes, 'camel'), {
          todos: resultingList.related('todos').toJSON().map(todo => convertCaseOfKeys(todo, 'camel'))
        })
      }))

     return Promise.all(promises).then((values) => {
        response.result = values;
        res.send(response);
      })
  });
});

router.post('/', function(req, res, next) {
  List.forge({ name: req.body.name }).save().then(list => {
    const response = {};
    response.status = 200;
    response.result = convertCaseOfKeys(list, 'camel');
    res.send(response);
  });
});

router.get('/:id', (req, res, next) => {
  new List({id: req.params.id}).fetch().then(list => {
    const response = {};
    response.status = 200;
    response.count = 1;
    response.result = convertCaseOfKeys(list, 'camel');
    res.send(response);
  })
});

router.get('/:id/todos', (req, res, next) => {
  new List({ id: req.params.id }).fetch({withRelated:['todos']}).then(list => {
    const response = {};
    const todos = list.related('todos').toJSON();
    response.status = 200;
    response.count = todos.length;
    response.result = todos.map(todo => convertCaseOfKeys(todo, 'camel'));
    res.send(response);
  })
});

router.post('/:id/todos', (req, res, next) => {
  new List({id: req.params.id}).fetch().then(list => {
    list.related('todos').create({
      text: req.body.text,
      is_complete: false
    }).then(todo => {
      const response = {};
      response.result = {};
      response.result.todo = convertCaseOfKeys(todo, 'camel');
      response.result.list = convertCaseOfKeys(list, 'camel');
      res.send(response);
    });

  })
});

module.exports = router;
