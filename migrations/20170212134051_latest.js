exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('lists', function(table){
    table.string('visibility_filter').defaultTo('all')
  })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.table('lists', function(table){
    table.dropColumn('visibility_filter')
  })
};
