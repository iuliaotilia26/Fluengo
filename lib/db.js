"use strict";
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'supersecret',
        database: 'fluengo'
    }
});
exports.knex = knex;
//# sourceMappingURL=db.js.map