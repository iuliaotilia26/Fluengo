/**
 * Created by Iulia Mustea on 11/3/2016.
 */
import {Router, Response, Request} from "express";
import {knex} from "../db";

const languageRouter: Router = Router();

languageRouter.get("/", (request: Request, response: Response) => {
  knex.select().distinct('language').from('teacher').then((data) => response.json(data));
});

export {languageRouter}
