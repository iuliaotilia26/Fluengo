/**
 * Created by Iulia Mustea on 1/26/2017.
 */
import {knex} from "../db";
var express = require('express');
var fileUpload = require('express-fileupload');
var uploadRouterStudent = express();

var path = require("path");

uploadRouterStudent.use(fileUpload());

uploadRouterStudent.post('/', function(req, res) {


  var sampleFile;

  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }

  var pathName = path.join('src','public','profile-pictures',req.files.file.name);


  sampleFile = req.files.file;

  console.log("User teacher_id este "+ req.user.teacher_id);

  sampleFile.mv(pathName, function(err) {


    knex('student')
      .where('id',req.user.id)
      .update({
        image_name: req.files.file.name
      })
      .then(() => {
        if(req.user.teacher_id !== null)
        {
          knex('teacher')
            .where('id',req.user.teacher_id)
            .update({
              image_name: req.files.file.name
            })
            .then((data)=>res.json(data))
        }
        else return res.json();
      })
      .catch((err) => {
        if (parseInt(err.message, 10) === 404) {
          return res.status(404).send('Not Found');
        } else {
          return res.status(500).send(err.message);
        }
      });
  });


});

export {uploadRouterStudent}
