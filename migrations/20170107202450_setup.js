exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function(table){
      table.string('username')
      table.string('password')
      table.timestamps()
    }),
    knex.schema.createTableIfNotExists('lists', function(table){
      table.increments();
      table.string('name')
      table.timestamps()
    }),
    knex.schema.createTableIfNotExists('todos', function(table){
      table.increments();
      table.string('text')
      table.boolean('isComplete')
      table.timestamps()
      // table.string('list').references('lists.id')
      // table.referencesColumn('list')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('lists'),
    knex.schema.dropTable('todos')
  ])
};
