exports.up = function(knex, Promise) {
  return knex.schema.table('student', function (table) {
    table.string('google_id');
    table.string('google_token');
    table.string('windows_id');
    table.text('windows_token');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('student', function (table) {
    table.dropColumn('google_id');
    table.dropColumn('google_token');
    table.dropColumn('windows_id');
    table.dropColumn('windows_token');
  })
};
