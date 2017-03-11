"use strict";
/**
 * Created by Iulia Mustea on 1/11/2017.
 */
var express_1 = require("express");
var db_1 = require("../db");
var studentInfoRouter = express_1.Router();
exports.studentInfoRouter = studentInfoRouter;
studentInfoRouter.get("/:id", function (request, response) {
    db_1.knex('student')
        .where('id', request.params.id)
        .select('*')
        .then(function (results) {
        return response.json(results);
    });
});
//# sourceMappingURL=studentInfo.js.map