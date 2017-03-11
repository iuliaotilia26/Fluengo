"use strict";
/**
 * Created by Iulia Mustea on 11/3/2016.
 */
var express_1 = require("express");
var db_1 = require("../db");
var languageRouter = express_1.Router();
exports.languageRouter = languageRouter;
languageRouter.get("/", function (request, response) {
    db_1.knex.select().distinct('language').from('teacher').then(function (data) { return response.json(data); });
});
//# sourceMappingURL=language.js.map