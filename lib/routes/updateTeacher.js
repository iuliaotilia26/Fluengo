"use strict";
/**
 * Created by Iulia Mustea on 1/11/2017.
 */
var express_1 = require("express");
var db_1 = require("../db");
var updateTeacherRouter = express_1.Router();
exports.updateTeacherRouter = updateTeacherRouter;
updateTeacherRouter.post('/', function (request, response) {
    db_1.knex('teacher')
        .where('id', request.body.teacher_id)
        .update({
        description: request.body.description,
        language: request.body.language,
        location: request.body.location,
        level: request.body.level,
        price: request.body.price,
        currency: request.body.currency,
        duration: request.body.duration
    })
        .then(function (data) { return response.json(data); })
        .catch(function (err) {
        if (parseInt(err.message, 10) === 404) {
            return response.status(404).send('Not Found');
        }
        else {
            return response.status(500).send(err.message);
        }
    });
});
//# sourceMappingURL=updateTeacher.js.map