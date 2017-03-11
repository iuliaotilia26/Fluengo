
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teacher', (table) => {
    table.increments('id').primary().notNullable().unique();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.string('language').notNullable();
    table.string('location').notNullable();
    table.string('level').notNullable();
    table.decimal('price',10,4).notNullable().unsigned();
    table.string('currency').notNullable();
    table.decimal('duration',4,2).notNullable().unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teacher');
};
