"use strict";
var express = require('express');
var router = express.Router();
const Todo = require('../models/database').Todo;
const convertCaseOfKeys = require('../lib/utils/convert_case').convertCaseOfKeys;

router.get('/:id', (req, res, next) => {
  new Todo({id: req.params.id}).fetch().then(todo => {
    const response = {};
    response.status = 200;
    response.count = 1;
    response.result = convertCaseOfKeys(todo, 'camel');
    res.send(response);
  })
});

router.put('/:id', (req, res, next) => {

  new Todo({id: req.params.id}).save({
    is_complete: req.body.isComplete,
    updated_at: new Date().toISOString()
  }, { patch: true }).then(todoModel => {
    const response = {};
    todoModel.fetch().then(todo => {
      response.status = 200;
      response.count = 1;
      response.result = convertCaseOfKeys(todo.attributes, 'camel');
      res.send(response);
    });
  }).catch(err => console.error(err))
});

module.exports = router;
