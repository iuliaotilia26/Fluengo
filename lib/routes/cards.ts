import {Router, Response, Request} from "express";
import {knex} from "../db";

const cardRouter: Router = Router();

cardRouter.get("/", (request: Request, response: Response) => {
  response.header('Content-type', 'application/json');
  let query = knex.select('id', 'name', 'description', 'language', 'location', 'level', 'price', 'currency', 'duration','image_name').from('teacher');

  if (request.query.location) {
    query = query.where('location', request.query.location);
  }
  if (request.query.language) {
    query = query.where('language', request.query.language);
  }

  return query.then((data) => response.json(data));
});

export {cardRouter}
