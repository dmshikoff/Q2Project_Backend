
const TABLE_NAME = 'users'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, username: 'DanielShikoff', password: '$2a$10$cHkfsRfdy34Jsy2lt0h.cenUNozgL/vDlO1ulo0X.zFQSSxwJ.DLe'},
        {id: 2, username: 'RachelShikoff', password: '$2a$10$4T9uAioKDtW0jiE0NMeB1eVqMBvjLlpK5IZxHfCyWf3TJ1onggITG'},
        {id: 3, username: 'SophiaShikoff', password: '$2a$10$5iEnxxzdCkLWEyVBqdI6eOn/FgybOfuJuHETyRZZ4Okh1luzvRbFG'}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
