import {knex} from "../db";
/**
 * Created by Iulia Mustea on 1/17/2017.
 */

var express = require('express');
var fileUpload = require('express-fileupload');
var uploadRouter = express();

var path = require("path");

uploadRouter.use(fileUpload());

uploadRouter.post('/', function(req, res) {


  var sampleFile;

  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }

  var pathName = path.join('src','public','profile-pictures',req.files.file.name);


  // Use the mv() method to place the file somewhere on your server

  sampleFile = req.files.file;

  console.log(pathName);

  sampleFile.mv(pathName, function(err) {

    knex('teacher')
      .where('id',req.user.teacher_id)
      .update({
        image_name: req.files.file.name
      })
      .then(() => {
        knex('student')
          .where('id',req.user.id)
          .update({
            image_name: req.files.file.name
          })
          .then((data)=>res.json(data))
      })
      .catch((err) => {
        if (parseInt(err.message, 10) === 404) {
          return res.status(404).send('Not Found');
        } else {
          return res.status(500).send(err.message);
        }
      });

    /*if (err) {
      res.status(500).send(err);
    }
    else {
      res.send('File uploaded!');
    }*/
  });


});

export {uploadRouter}
