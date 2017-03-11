exports.up = function(knex, Promise) {
  return knex.schema.table('teacher', function (table) {
    table.string('image_name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('teacher', function (table) {
    table.dropColumn('image_name');
  })
};
