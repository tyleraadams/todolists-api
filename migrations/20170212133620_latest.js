exports.up = function(knex, Promise) {
  knex.schema.table('lists', function(table){
    table.string('visibilityFilter').defaultTo('all')
  })
};

exports.down = function(knex, Promise) {
  knex.schema.table('lists', function(table){
    table.dropColumn('visibilityFilter')
  })
};
