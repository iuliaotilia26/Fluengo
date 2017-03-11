"use strict";
/**
 * Created by Iulia Mustea on 11/10/2016.
 */
var express_1 = require("express");
var booking_service_1 = require("../services/booking-service");
var bookingService = new booking_service_1.BookingService();
var bookRouter = express_1.Router();
exports.bookRouter = bookRouter;
bookRouter.post('/', function (request, response) {
    bookingService.performBooking({
        teacherId: request.body.id,
        studentId: request.user.id,
        studentName: request.body.name,
        studentEmail: request.body.email,
        when: new Date(request.body.when),
        studentMessage: request.body.message
    }).then(function (data) { return response.json(data); })
        .catch(function (err) {
        if (parseInt(err.message, 10) === 404) {
            return response.status(404).send('Not Found');
        }
        else {
            return response.status(500).send('Unexpected error');
        }
    });
});
//# sourceMappingURL=book.js.map