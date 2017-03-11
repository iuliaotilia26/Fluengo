/**
 * Created by Iulia Mustea on 1/11/2017.
 */
import {Router, Request, Response} from "express";

import {knex} from "../db";


const updateTeacherRouter: Router = Router();

updateTeacherRouter.post('/', function(request: Request, response: Response) {

  knex('teacher')
    .where('id',request.body.teacher_id)
    .update({
      description: request.body.description,
      language: request.body.language,
      location: request.body.location,
      level: request.body.level,
      price:request.body.price,
      currency:request.body.currency,
      duration:request.body.duration
    })
    .then((data) => response.json(data))
    .catch((err) => {
      if (parseInt(err.message, 10) === 404) {
        return response.status(404).send('Not Found');
      } else {
        return response.status(500).send(err.message);
      }
    });

});


export {updateTeacherRouter}
