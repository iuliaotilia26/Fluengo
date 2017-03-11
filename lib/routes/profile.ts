/**
 * Created by Iulia Mustea on 12/6/2016.
 */
import {Router, Response, Request} from "express";
import {knex} from "../db";

const profileRouter: Router = Router();

profileRouter.get("/:id", (request: Request, response: Response) => {

  Promise.all([
    knex('student').where('student.id', request.params.id).select('student.*'),
    knex('booking').where('booking.student_id', request.params.id).select('booking.*')
  ]).then((results) => {
    if (results[0].length !== 1) {
      return response.status(404).send('not found');
    }

    return response.json({
      student: results[0][0],
      bookings: results[1]
    });
  });
});


export {profileRouter}
