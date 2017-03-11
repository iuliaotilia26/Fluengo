/**
 * Created by Iulia Mustea on 11/10/2016.
 */
import {Router, Request, Response} from "express";

import {BookingService} from "../services/booking-service";

const bookingService = new BookingService();

const bookRouter: Router = Router();

bookRouter.post('/', function (request: Request, response: Response) {
  bookingService.performBooking({
    teacherId: request.body.id,
    studentId: request.user.id,
    studentName: request.body.name,
    studentEmail: request.body.email,
    when: new Date(request.body.when),
    studentMessage: request.body.message
  }).then((data) => response.json(data))
    .catch((err) => {
      if (parseInt(err.message, 10) === 404) {
        return response.status(404).send('Not Found');
      } else {
        return response.status(500).send('Unexpected error');
      }
    });
});

export {bookRouter}
