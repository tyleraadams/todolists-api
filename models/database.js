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
    list: function() {
        return this.belongsTo(List);
    }
});

exports.List = bookshelf.Model.extend({
    tableName: 'lists',
    todos: function() {
        return this.hasMany(Todo)
    }
});



