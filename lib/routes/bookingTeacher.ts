/**
 * Created by Iulia Mustea on 12/21/2016.
 */
import {Router, Response, Request} from "express";
import {knex} from "../db";

const bookingTeacherRouter: Router = Router();

bookingTeacherRouter.get("/:id", (request: Request, response: Response) => {


  knex('booking')
    .where('id_teacher', request.params.id)
    .select('*')
    .then((results) => {


      return response.json(results);
    });

});


export {bookingTeacherRouter}
