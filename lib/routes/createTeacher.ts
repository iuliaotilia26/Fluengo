/**
 * Created by Iulia Mustea on 12/9/2016.
 */
import {Router, Request, Response} from "express";

import {knex} from "../db";


const createTeacherRouter: Router = Router();

createTeacherRouter.post('/', function(request: Request, response: Response) {

  knex('teacher')
    .insert({

    name: request.body.name,
    description: request.body.description,
    language: request.body.language,
    location: request.body.location,
    level: request.body.level,
    price:request.body.price,
    currency:request.body.currency,
    duration:request.body.duration,
    email:request.body.email

  })
    .then((data) => {

      console.log(data);
      knex('student')
        .where('id', request.body.id)
        .update({
          teacher_id: data
        })
        .then((dataFinal) => response.json(dataFinal));
    })
    .catch((err) => {
      if (parseInt(err.message, 10) === 404) {
        return response.status(404).send('Not Found');
      } else {
        return response.status(500).send(err.message);
      }
    });

});


export {createTeacherRouter}
