exports.up = function(knex, Promise) {
  return knex.schema.table('booking', function (table) {
    table.integer('student_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('booking', function (table) {
    table.dropColumn('student_id');
  })
};
