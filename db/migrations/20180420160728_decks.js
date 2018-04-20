
const TABLE_NAME = 'decks'

exports.up = function(knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, table => {
    table.increments()
    table.string('name').notNullable()
    table.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};
