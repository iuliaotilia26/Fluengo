
exports.up = function(knex, Promise) {
  return knex.schema.table('teacher', function (table) {
    table.string('email').notNullable().unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('teacher', function (table) {
    table.dropColumn('email');
  })
};

