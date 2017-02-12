exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('todos', function(table){
      table.dropColumn('isComplete')
      table.boolean('is_complete')
    })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.table('lists', function(table){
    table.dropColumn('is_complete')
  })
};
