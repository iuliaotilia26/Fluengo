exports.up = function(knex, Promise) {
  return knex.schema.table('student', function (table) {
    table.integer('teacher_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('student', function (table) {
    table.dropColumn('teacher_id');
  })
};
