
const TABLE_NAME = 'cards'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, multiverseId: 4244, name: 'Vampiric Touch', cmc: 3, text: 'Vampiric Touch deals 2 damage to your opponent. You gain 2 life.', red: false, black: true, green: false, white: false, blue: false, colorless: false, img: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=4244&type=card'},
        {id: 2, multiverseId: 4207, name: 'Arrogant Vampire', cmc: 5, text: 'Flying', red: false, black: true, green: false, white: false, blue: false, colorless: false, img: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=4207&type=card'},
        {id: 3, multiverseId: 134762, name: 'Fugitive Wizard', cmc: 1, text: '', red: false, black: false, green: false, white: false, blue: true, colorless: false, img: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=134762&type=card'}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
