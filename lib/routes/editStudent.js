"use strict";
/**
 * Created by Iulia Mustea on 1/26/2017.
 */
var express_1 = require("express");
var db_1 = require("../db");
var editStudentRouter = express_1.Router();
exports.editStudentRouter = editStudentRouter;
editStudentRouter.post('/', function (request, response) {
    db_1.knex('student')
        .where('id', request.body.id)
        .update({
        name: request.body.name,
        email: request.body.email
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
//# sourceMappingURL=editStudent.js.map