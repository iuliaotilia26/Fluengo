/**
 * Created by Iulia Mustea on 11/3/2016.
 */
import {Router, Response, Request} from "express";
import {knex} from "../db";

const locationRouter: Router = Router();

locationRouter.get("/", (request: Request, response: Response) => {
  knex.select().distinct('location').from('teacher').then((data) => response.json(data));
});

export {locationRouter}
