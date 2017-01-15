const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'tyadams',
        port: '5432',
        database: 'todos',
        charset: 'utf8'
    }
});

const bookshelf = require('bookshelf')(knex);

const Todo = bookshelf.Model.extend({
  tableName: 'todos',
  hasTimestamps: true,
  list: function() {
      return this.belongsTo(List);
  }
});

exports.Todo = Todo;

exports.List = bookshelf.Model.extend({
  tableName: 'lists',
  hasTimestamps: true,
  todos: function() {
    return this.hasMany(Todo)
  }
});



