'use strict';
const faker = require('faker');
const getRandomInt = require('../lib/utils/get_random_int').getRandomInt;

const listSeeds = [];
const todoSeeds = [];
const todoFilters = ['all', 'complete', 'incomplete'];


for (let i = 0; i < 1000; i++) {
  listSeeds.push({
    id: i + 1,
    name: faker.lorem.word(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    visibility_filter: todoFilters[getRandomInt(0,3)]
  });
}

for (let i = 0; i < 10000; i++ ) {
  todoSeeds.push({
    id: i + 1,
    text: faker.lorem.sentence(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    list_id: getRandomInt(1, 1001),
    is_complete: !getRandomInt(0,2)
  });
}

exports.seed = function(knex, Promise) {
  return knex('todos').del().
    then(function() {
      return knex('lists').del();
    })
    .then(function () {
      return Promise.all(listSeeds.map(item => knex('lists').insert(item)));
    }).then(function() {
      return Promise.all(todoSeeds.map(item => knex('todos').insert(item)))
    });
};
