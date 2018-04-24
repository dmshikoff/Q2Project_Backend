
const TABLE_NAME = 'users'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, username: 'DanielShikoff', password: 'DanielShikoff'},
        {id: 2, username: 'RachelShikoff', password: 'RachelShikoff'},
        {id: 3, username: 'SophiaShikoff', password: 'SophiaShikoff'}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};