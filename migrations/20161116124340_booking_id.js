
exports.up = function(knex, Promise) {
  return knex.schema.table('booking', function (table) {
    table.string('teacher_link').notNullable();
    table.string('student_link').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('booking', function (table) {
    table.dropColumn('teacher_link');
    table.dropColumn('student_link');
  })
};
