exports.up = function(knex, Promise) {
  return knex.schema.table('student', function (table) {
    table.string('token_twitter');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('student', function (table) {
    table.dropColumn('token_twitter');
  })
};
