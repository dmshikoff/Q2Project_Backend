
const TABLE_NAME = 'cards'

exports.up = function(knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, table => {
        table.increments()
        table.integer('multiverseId').notNullable()
        table.string('name').notNullable()
        table.integer('cmc').notNullable()
        table.string('text').notNullable()
        table.boolean('color is red').notNullable()
        table.boolean('color is black').notNullable()
        table.boolean('color is green').notNullable()
        table.boolean('color is white').notNullable()
        table.boolean('color is blue').notNullable()
        table.boolean('color is colorless').notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};
