"use strict";
/**
 * Created by Iulia Mustea on 1/26/2017.
 */
var db_1 = require("../db");
var express = require('express');
var fileUpload = require('express-fileupload');
var uploadRouterStudent = express();
exports.uploadRouterStudent = uploadRouterStudent;
var path = require("path");
uploadRouterStudent.use(fileUpload());
uploadRouterStudent.post('/', function (req, res) {
    var sampleFile;
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    var pathName = path.join('src', 'public', 'profile-pictures', req.files.file.name);
    sampleFile = req.files.file;
    console.log("User teacher_id este " + req.user.teacher_id);
    sampleFile.mv(pathName, function (err) {
        db_1.knex('student')
            .where('id', req.user.id)
            .update({
            image_name: req.files.file.name
        })
            .then(function () {
            if (req.user.teacher_id !== null) {
                db_1.knex('teacher')
                    .where('id', req.user.teacher_id)
                    .update({
                    image_name: req.files.file.name
                })
                    .then(function (data) { return res.json(data); });
            }
            else
                return res.json();
        })
            .catch(function (err) {
            if (parseInt(err.message, 10) === 404) {
                return res.status(404).send('Not Found');
            }
            else {
                return res.status(500).send(err.message);
            }
        });
    });
});
//# sourceMappingURL=uploadStudent.js.map