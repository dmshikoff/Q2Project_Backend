
const TABLE_NAME = 'types'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, name: 'Creature'},
        {id: 2, name: 'Sorcery'},
        {id: 3, name: 'Land'},
        {id: 4, name: 'Artifact'},
        {id: 5, name: 'Enchantment'},
        {id: 6, name: 'Planeswalker'},
        {id: 7, name: 'Instant'}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
