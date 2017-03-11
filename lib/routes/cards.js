"use strict";
var express_1 = require("express");
var db_1 = require("../db");
var cardRouter = express_1.Router();
exports.cardRouter = cardRouter;
cardRouter.get("/", function (request, response) {
    response.header('Content-type', 'application/json');
    var query = db_1.knex.select('id', 'name', 'description', 'language', 'location', 'level', 'price', 'currency', 'duration', 'image_name').from('teacher');
    if (request.query.location) {
        query = query.where('location', request.query.location);
    }
    if (request.query.language) {
        query = query.where('language', request.query.language);
    }
    return query.then(function (data) { return response.json(data); });
});
//# sourceMappingURL=cards.js.map