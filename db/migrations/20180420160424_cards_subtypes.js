
const TABLE_NAME = 'cards_subtypes'

exports.up = function(knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, table => {
    table.increments()
    table.integer('subtypes_id').notNullable().references('subtypes.id')
    table.integer('cards_id').notNullable().references('cards.id')
    table.timestamps(true, true)
})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};
