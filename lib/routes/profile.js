"use strict";
/**
 * Created by Iulia Mustea on 12/6/2016.
 */
var express_1 = require("express");
var db_1 = require("../db");
var profileRouter = express_1.Router();
exports.profileRouter = profileRouter;
profileRouter.get("/:id", function (request, response) {
    Promise.all([
        db_1.knex('student').where('student.id', request.params.id).select('student.*'),
        db_1.knex('booking').where('booking.student_id', request.params.id).select('booking.*')
    ]).then(function (results) {
        if (results[0].length !== 1) {
            return response.status(404).send('not found');
        }
        return response.json({
            student: results[0][0],
            bookings: results[1]
        });
    });
});
//# sourceMappingURL=profile.js.map