exports.up = function(knex, Promise) {
  return knex.schema.table('student', function (table) {
    table.string('image_name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('student', function (table) {
    table.dropColumn('image_name');
  })
};
