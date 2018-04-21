
const TABLE_NAME = 'users'

exports.up = function (knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, table => {
        table.increments()
        table.string('username').notNullable()
        table.string('password').notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};
