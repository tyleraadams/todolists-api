exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function(table){
      table.string('username')
      table.string('password')
      table.timestamps()
    }),
    knex.schema.createTableIfNotExists('lists', function(table){
      table.increments();
      // table.foreign('id').references('todos.list')
      table.string('name')
      table.timestamps()
    }),
    knex.schema.createTableIfNotExists('todos', function(table){
      table.increments();
      table.string('text')
      table.boolean('isComplete')
      table.timestamps()
      table.integer('list_id').unsigned().references('lists.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('todos'),
    knex.schema.dropTable('lists')

  ])
};
