exports.up = function(knex, Promise) {
  return knex.schema.createTable('booking', (table) => {
    table.increments('id').primary().notNullable().unique();
    table.integer('id_teacher').notNullable();
    table.string('name_student').notNullable();
    table.string('email_student').notNullable();
    table.datetime('created_at').notNullable();
    table.datetime('when').notNullable();
    table.text('message').notNullable();
    table.string('status').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('booking');
};
