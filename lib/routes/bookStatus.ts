/**
 * Created by Iulia Mustea on 11/16/2016.
 */
import {Router, Response, Request} from "express";
import {knex} from "../db";
import {EmailNotificationTemplates, EmailNotificationService} from '../services/email-notification-service';

const bookStatusRouter: Router = Router();

bookStatusRouter.get("/student/:id", (request: Request, response: Response) => {
  knex('booking')
    .join('teacher', 'booking.id_teacher', '=', 'teacher.id')
    .select('teacher.*', 'booking.*')
    .where('booking.student_link', request.params.id).then((data) => {
    console.log(data);
    if (data.length === 0) {
      return response.status(404).send('Not Found')
    }
    else {
      return response.json(data[0]);
    }
  });
});

bookStatusRouter.get("/teacher/:id", (request: Request, response: Response) => {
  knex('booking')
    .join('teacher', 'booking.id_teacher', '=', 'teacher.id')
    .select('teacher.*', 'booking.*')
    .where('booking.teacher_link', request.params.id).then((data) => {
    if (data.length === 0) {
      return response.status(404).send('Not Found')
    }
    else {
      return response.json(data[0]);
    }
  });
});

bookStatusRouter.post('/student/:id/cancel', function (request: Request, response: Response) {
  knex('booking')
    .where('booking.student_link', request.params.id)
    .update({
      status: 'canceled'
    }).then(() =>
    knex('booking')
      .join('teacher', 'booking.id_teacher', '=', 'teacher.id')
      .select('teacher.*', 'booking.*')
      .where('booking.student_link', request.params.id))
    .then((data) => {
      if (data.length === 0) {
        return response.status(404).send('Not Found')
      }

      const teacherEmail = data[0].email;
      if (teacherEmail) {
        new EmailNotificationService().sendEmail(
          teacherEmail,
          'Booking student cancel',
          EmailNotificationTemplates.TEMPLATE_CANCELTEACHER, {
            date_booking: data[0].when,
            teacher_link: data[0].teacher_link
          }).then((result) => {
          console.log(result.response)
        }).catch((err) => {
          console.warn(err);
        });
      }
      return response.json(data);
    })
    .catch((errorCode) => {
      if (errorCode === 404) {
        return response.status(404).send('Not Found');
      } else {
        return response.status(errorCode).send('Unexpected error');
      }
    });
});

bookStatusRouter.post('/teacher/:id/accept', function (request: Request, response: Response) {
  knex('booking')
    .select('when')
    .where('booking.teacher_link', request.params.id)
    .then
    ((data) => {
      const Minute = 60 * 1000;
      const currDate = new Date().getTime();
      if (Math.round(Math.abs(data[0].when.getTime() - currDate) / (Minute)) >= 60) {
        knex('booking')
          .where('booking.teacher_link', request.params.id)
          .update({
            status: 'accepted'
          })
          .then((data) => {
            knex('booking')
              .select()
              .where('booking.teacher_link', request.params.id)
              .then((data) => {

                const studentEmail = data[0].email_student;
                if (studentEmail) {
                  new EmailNotificationService().sendEmail(
                    studentEmail,
                    'Booking accept',
                    EmailNotificationTemplates.TEMPLATE_ACCEPT, {
                      date_booking: data[0].when,
                      student_link: data[0].student_link
                    }).then((result) => {
                    console.log(result.response)
                  }).catch((err) => {
                    console.warn(err);
                  });
                }

              });
          })
          .catch((errorCode) => {
            if (errorCode === 404) {
              return response.status(404).send('Not Found');
            } else {
              return response.status(errorCode).send('Unexpected error');
            }
          });
      }
      else return response.status(400).send('Too early');
    }).catch((errorCode) => {
    return response.status(500).send('Unexpected error: ' + errorCode);
  });

});


bookStatusRouter.post('/teacher/:id/reject', function (request: Request, response: Response) {
  knex('booking')
    .where('booking.student_link', request.params.id)
    .update({
      status: 'rejected'
    })
    .then((data) => knex('booking')
      .select()
      .where('booking.teacher_link', request.params.id))
    .then((data) => {
      if (data.length === 0) {
        return response.status(404).send('Not Found')
      }

      const studentEmail = data[0].email_student;
      if (studentEmail) {
        new EmailNotificationService().sendEmail(
          studentEmail,
          'Booking student reject',
          EmailNotificationTemplates.TEMPLATE_REJECT, {
            date_booking: data[0].when,
            student_link: data[0].student_link
          }).then((result) => {
          console.log(result.response)
        }).catch((err) => {
          console.warn(err);
        });
      }

      return response.json(data);
    })
    .catch((err) => response.send(500));
});

bookStatusRouter.post('/teacher/:id/cancel', function (request: Request, response: Response) {
  knex('booking')
    .select('when')
    .where('booking.teacher_link', request.params.id)
    .then
    ((data) => {
      const Minute = 60 * 1000;
      const currDate = new Date().getTime();
      if (Math.round(Math.abs(data[0].when.getTime() - currDate) / (Minute)) >= 30) {
        knex('booking')
          .where('booking.teacher_link', request.params.id)
          .update({
            status: 'canceled'
          }).then((data) => {

          knex('booking')
            .select()
            .where('booking.teacher_link', request.params.id)
            .then((data) => {

              const studentEmail = data[0].email_student;
              if (studentEmail) {
                new EmailNotificationService().sendEmail(
                  studentEmail,
                  'Booking student reject',
                  EmailNotificationTemplates.TEMPLATE_CANCELSTUDENT, {
                    date_booking: data[0].when,
                    student_link: data[0].student_link
                  }).then((result) => {
                  console.log(result.response)
                }).catch((err) => {
                  console.warn(err);
                });
              }
            });
        })
          .catch((errorCode) => {
            if (errorCode === 404) {
              return response.status(404).send('Not Found');
            } else {
              return response.status(errorCode).send('Unexpected error');
            }
          });
      }
    })
    .catch((errorCode) => {
      return response.status(500).send('Unexpected error: ' + errorCode);
    });
});

export {bookStatusRouter}

