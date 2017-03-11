"use strict";
/**
 * Created by Iulia Mustea on 11/16/2016.
 */
var express_1 = require("express");
var db_1 = require("../db");
var email_notification_service_1 = require('../services/email-notification-service');
var bookStatusRouter = express_1.Router();
exports.bookStatusRouter = bookStatusRouter;
bookStatusRouter.get("/student/:id", function (request, response) {
    db_1.knex('booking')
        .join('teacher', 'booking.id_teacher', '=', 'teacher.id')
        .select('teacher.*', 'booking.*')
        .where('booking.student_link', request.params.id).then(function (data) {
        console.log(data);
        if (data.length === 0) {
            return response.status(404).send('Not Found');
        }
        else {
            return response.json(data[0]);
        }
    });
});
bookStatusRouter.get("/teacher/:id", function (request, response) {
    db_1.knex('booking')
        .join('teacher', 'booking.id_teacher', '=', 'teacher.id')
        .select('teacher.*', 'booking.*')
        .where('booking.teacher_link', request.params.id).then(function (data) {
        if (data.length === 0) {
            return response.status(404).send('Not Found');
        }
        else {
            return response.json(data[0]);
        }
    });
});
bookStatusRouter.post('/student/:id/cancel', function (request, response) {
    db_1.knex('booking')
        .where('booking.student_link', request.params.id)
        .update({
        status: 'canceled'
    }).then(function () {
        return db_1.knex('booking')
            .join('teacher', 'booking.id_teacher', '=', 'teacher.id')
            .select('teacher.*', 'booking.*')
            .where('booking.student_link', request.params.id);
    })
        .then(function (data) {
        if (data.length === 0) {
            return response.status(404).send('Not Found');
        }
        var teacherEmail = data[0].email;
        if (teacherEmail) {
            new email_notification_service_1.EmailNotificationService().sendEmail(teacherEmail, 'Booking student cancel', email_notification_service_1.EmailNotificationTemplates.TEMPLATE_CANCELTEACHER, {
                date_booking: data[0].when,
                teacher_link: data[0].teacher_link
            }).then(function (result) {
                console.log(result.response);
            }).catch(function (err) {
                console.warn(err);
            });
        }
        return response.json(data);
    })
        .catch(function (errorCode) {
        if (errorCode === 404) {
            return response.status(404).send('Not Found');
        }
        else {
            return response.status(errorCode).send('Unexpected error');
        }
    });
});
bookStatusRouter.post('/teacher/:id/accept', function (request, response) {
    db_1.knex('booking')
        .select('when')
        .where('booking.teacher_link', request.params.id)
        .then(function (data) {
        var Minute = 60 * 1000;
        var currDate = new Date().getTime();
        if (Math.round(Math.abs(data[0].when.getTime() - currDate) / (Minute)) >= 60) {
            db_1.knex('booking')
                .where('booking.teacher_link', request.params.id)
                .update({
                status: 'accepted'
            })
                .then(function (data) {
                db_1.knex('booking')
                    .select()
                    .where('booking.teacher_link', request.params.id)
                    .then(function (data) {
                    var studentEmail = data[0].email_student;
                    if (studentEmail) {
                        new email_notification_service_1.EmailNotificationService().sendEmail(studentEmail, 'Booking accept', email_notification_service_1.EmailNotificationTemplates.TEMPLATE_ACCEPT, {
                            date_booking: data[0].when,
                            student_link: data[0].student_link
                        }).then(function (result) {
                            console.log(result.response);
                        }).catch(function (err) {
                            console.warn(err);
                        });
                    }
                });
            })
                .catch(function (errorCode) {
                if (errorCode === 404) {
                    return response.status(404).send('Not Found');
                }
                else {
                    return response.status(errorCode).send('Unexpected error');
                }
            });
        }
        else
            return response.status(400).send('Too early');
    }).catch(function (errorCode) {
        return response.status(500).send('Unexpected error: ' + errorCode);
    });
});
bookStatusRouter.post('/teacher/:id/reject', function (request, response) {
    db_1.knex('booking')
        .where('booking.student_link', request.params.id)
        .update({
        status: 'rejected'
    })
        .then(function (data) { return db_1.knex('booking')
        .select()
        .where('booking.teacher_link', request.params.id); })
        .then(function (data) {
        if (data.length === 0) {
            return response.status(404).send('Not Found');
        }
        var studentEmail = data[0].email_student;
        if (studentEmail) {
            new email_notification_service_1.EmailNotificationService().sendEmail(studentEmail, 'Booking student reject', email_notification_service_1.EmailNotificationTemplates.TEMPLATE_REJECT, {
                date_booking: data[0].when,
                student_link: data[0].student_link
            }).then(function (result) {
                console.log(result.response);
            }).catch(function (err) {
                console.warn(err);
            });
        }
        return response.json(data);
    })
        .catch(function (err) { return response.send(500); });
});
bookStatusRouter.post('/teacher/:id/cancel', function (request, response) {
    db_1.knex('booking')
        .select('when')
        .where('booking.teacher_link', request.params.id)
        .then(function (data) {
        var Minute = 60 * 1000;
        var currDate = new Date().getTime();
        if (Math.round(Math.abs(data[0].when.getTime() - currDate) / (Minute)) >= 30) {
            db_1.knex('booking')
                .where('booking.teacher_link', request.params.id)
                .update({
                status: 'canceled'
            }).then(function (data) {
                db_1.knex('booking')
                    .select()
                    .where('booking.teacher_link', request.params.id)
                    .then(function (data) {
                    var studentEmail = data[0].email_student;
                    if (studentEmail) {
                        new email_notification_service_1.EmailNotificationService().sendEmail(studentEmail, 'Booking student reject', email_notification_service_1.EmailNotificationTemplates.TEMPLATE_CANCELSTUDENT, {
                            date_booking: data[0].when,
                            student_link: data[0].student_link
                        }).then(function (result) {
                            console.log(result.response);
                        }).catch(function (err) {
                            console.warn(err);
                        });
                    }
                });
            })
                .catch(function (errorCode) {
                if (errorCode === 404) {
                    return response.status(404).send('Not Found');
                }
                else {
                    return response.status(errorCode).send('Unexpected error');
                }
            });
        }
    })
        .catch(function (errorCode) {
        return response.status(500).send('Unexpected error: ' + errorCode);
    });
});
//# sourceMappingURL=bookStatus.js.map