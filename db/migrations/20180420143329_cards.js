
const TABLE_NAME = 'cards'

exports.up = function(knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, table => {
        table.increments()
        table.integer('multiverseId').notNullable()
        table.string('name').notNullable()
        table.integer('cmc').notNullable()
        table.text('text').notNullable()
        table.boolean('red').notNullable()
        table.boolean('black').notNullable()
        table.boolean('green').notNullable()
        table.boolean('white').notNullable()
        table.boolean('blue').notNullable()
        table.boolean('colorless').notNullable()
        table.string('img').notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};
