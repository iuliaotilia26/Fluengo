exports.up = function(knex, Promise) {
  return knex.schema.table('student', function (table) {
    table.string('twitter_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('student', function (table) {
    table.dropColumn('twitter_id');
  })
};
