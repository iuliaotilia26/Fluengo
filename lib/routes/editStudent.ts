/**
 * Created by Iulia Mustea on 1/26/2017.
 */
import {Router, Request, Response} from "express";

import {knex} from "../db";


const editStudentRouter: Router = Router();

editStudentRouter.post('/', function(request: Request, response: Response) {

  knex('student')
    .where('id',request.body.id)
    .update({
      name: request.body.name,
      email: request.body.email
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


export {editStudentRouter}
