"use strict";
/**
 * Created by Iulia Mustea on 12/21/2016.
 */
var express_1 = require("express");
var db_1 = require("../db");
var bookingTeacherRouter = express_1.Router();
exports.bookingTeacherRouter = bookingTeacherRouter;
bookingTeacherRouter.get("/:id", function (request, response) {
    db_1.knex('booking')
        .where('id_teacher', request.params.id)
        .select('*')
        .then(function (results) {
        return response.json(results);
    });
});
//# sourceMappingURL=bookingTeacher.js.map