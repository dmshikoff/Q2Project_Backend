
const TABLE_NAME = 'cards_subtypes'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, subtypes_id: 220, cards_id: 2},
        {id: 2, subtypes_id: 94, cards_id: 3},
        {id: 3, subtypes_id: 229, cards_id: 3}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
