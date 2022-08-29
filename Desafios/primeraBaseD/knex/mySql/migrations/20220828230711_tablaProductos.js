/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('productos', table => {
        table.increments('id', 255).primary().notNullable()
        table.string('nombre', 255).notNullable()
        table.integer('precio', 10).notNullable()
        table.string('thumbnail', 1500).notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('productos')
};
