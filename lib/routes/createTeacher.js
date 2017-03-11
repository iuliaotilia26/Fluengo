"use strict";
/**
 * Created by Iulia Mustea on 12/9/2016.
 */
var express_1 = require("express");
var db_1 = require("../db");
var createTeacherRouter = express_1.Router();
exports.createTeacherRouter = createTeacherRouter;
createTeacherRouter.post('/', function (request, response) {
    db_1.knex('teacher')
        .insert({
        name: request.body.name,
        description: request.body.description,
        language: request.body.language,
        location: request.body.location,
        level: request.body.level,
        price: request.body.price,
        currency: request.body.currency,
        duration: request.body.duration,
        email: request.body.email
    })
        .then(function (data) {
        console.log(data);
        db_1.knex('student')
            .where('id', request.body.id)
            .update({
            teacher_id: data
        })
            .then(function (dataFinal) { return response.json(dataFinal); });
    })
        .catch(function (err) {
        if (parseInt(err.message, 10) === 404) {
            return response.status(404).send('Not Found');
        }
        else {
            return response.status(500).send(err.message);
        }
    });
});
//# sourceMappingURL=createTeacher.js.map