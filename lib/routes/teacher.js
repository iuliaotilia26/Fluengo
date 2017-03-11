"use strict";
/**
 * Created by Iulia Mustea on 10/27/2016.
 */
var express_1 = require("express");
var db_1 = require("../db");
var teacherRouter = express_1.Router();
exports.teacherRouter = teacherRouter;
teacherRouter.get("/:id", function (request, response) {
    db_1.knex.select('id', 'name', 'description', 'language', 'location', 'level', 'price', 'currency', 'duration', 'image_name').from('teacher')
        .where('id', request.params.id).then(function (data) {
        if (data.length === 0) {
            return response.status(404).send('Not Found');
        }
        else {
            return response.json(data[0]);
        }
    });
});
teacherRouter.get("/similar/:id", function (request, response) {
    db_1.knex.select('language', 'location').from('teacher').where('id', request.params.id)
        .then(function (data) { return (db_1.knex.select('id', 'name', 'description', 'language', 'location', 'level', 'price', 'currency', 'duration', 'image_name').from('teacher')
        .whereNot('id', request.params.id)
        .andWhere('language', data[0].language)
        .andWhere('location', data[0].location)
        .limit(3).offset(0).then(function (dataFinal) { return response.json(dataFinal); })); });
});
//# sourceMappingURL=teacher.js.map