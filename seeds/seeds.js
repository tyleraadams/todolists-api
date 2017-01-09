
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('lists').insert({id: 10000, name: 'Chores', created_at: new Date(), updated_at: new Date()}),
        knex('lists').insert({id: 10001,name: 'Gift Ideas', created_at: new Date(), updated_at: new Date()}),
        knex('todos').insert({
          text: 'Dishes',
          created_at: new Date(),
          updated_at: new Date(),
          isComplete: false,
          list_id: 10000
        }),
        knex('todos').insert({
          text: 'Trash',
          created_at: new Date(),
          updated_at: new Date(),
          isComplete: false,
          list_id: 10000
        }),
        knex('todos').insert({
          text: 'Ree Drummond Cookbook',
          created_at: new Date(),
          updated_at: new Date(),
          isComplete: false,
          list_id: 10001
        })
      ]);
    });
};
