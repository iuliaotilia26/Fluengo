/**
 * Created by Iulia Mustea on 10/27/2016.
 */
import {Router, Response, Request} from "express";
import {knex} from "../db";

const teacherRouter: Router = Router();

teacherRouter.get("/:id", (request: Request, response: Response) => {
  knex.select('id', 'name', 'description', 'language', 'location', 'level', 'price', 'currency', 'duration','image_name').from('teacher')
    .where('id', request.params.id).then((data) => {
    if (data.length === 0) {
      return response.status(404).send('Not Found')
    }
    else {
      return response.json(data[0]);
    }
  });
});

teacherRouter.get("/similar/:id", (request: Request, response: Response) => {
  knex.select('language', 'location').from('teacher').where('id', request.params.id)
    .then((data) => (knex.select('id', 'name', 'description', 'language', 'location', 'level', 'price', 'currency', 'duration','image_name').from('teacher')
      .whereNot('id', request.params.id)
      .andWhere('language', data[0].language)
      .andWhere('location', data[0].location)
      .limit(3).offset(0).then((dataFinal) => response.json(dataFinal))));
});

export {teacherRouter}

