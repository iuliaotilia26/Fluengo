exports.up = function(knex, Promise) {
  return knex.schema.createTable('student', (table) => {
    table.increments('id').primary().notNullable().unique();
    table.string('token');
    table.string('name').notNullable();
    table.string('email').unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('student');
};
