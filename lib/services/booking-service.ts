/**
 * Created by Iulia Mustea on 11/11/2016.
 */

import * as uuid from 'node-uuid';

import {knex} from "../db";

import {EmailNotificationTemplates, EmailNotificationService} from './email-notification-service';

/**
 * Generates a random link
 * @return {string}
 */
function generateLink() {
  return uuid.v4();
}

/**
 * Service used to perform booking operations
 */
export class BookingService {
  /**
   * Performs a booking
   * @param teacherId
   * @param studentName
   * @param studentEmail
   * @param when
   * @param studentMessage
   * @return {Promise<any>}
   */
  public performBooking({
    teacherId,
    studentId,
    studentName,
    studentEmail,
    when,
    studentMessage
  }): Promise<any> {
    const teacherLink = generateLink();
    const studentLink = generateLink();
    const createdAt = new Date();

    return new Promise((resolver, rejecter) => {
      return knex('booking').insert({
        id_teacher: teacherId,
        student_id: studentId,
        name_student: studentName,
        email_student: studentEmail,
        when: when,
        message: studentMessage,
        status: 'submitted',
        teacher_link: teacherLink,
        student_link: studentLink,
        created_at: createdAt
      })
        .catch((err) => Promise.reject(new Error('Could not save booking')))
        .then(() => knex.select('name', 'email').from('teacher')
          .where('id', teacherId))
        .catch((err) => Promise.reject(new Error('Could not search for teacher')))
        .then((data) => {
          if (data.length === 0) {
            return Promise.reject(new Error(404));
          }

          data = data[0];
          // Resolve early for the HTTP client
          resolver(data);

          const teacherEmail = data.email;
          //mail pt teacher
          if (teacherEmail) {
            new EmailNotificationService().sendEmail(
              teacherEmail,
              'Booking request received',
              EmailNotificationTemplates.TEMPLATE_TEACHER, {
                student: studentName,
                date_booking: when,
                message_send: studentMessage,
                teacher_link: teacherLink
              }).then((result) => {
              console.log(result.response)
            }).catch((err) => {
              console.warn(err);
            });
          }

          //mail pt student
          new EmailNotificationService().sendEmail(
            studentEmail,
            'Booking request confirmation',
            EmailNotificationTemplates.TEMPLATE_STUDENT, {
              date_booking: when,
              name_teacher: data.name,
              student_link: studentLink
            }).then((result) => {
            console.log(result.response)
          }).catch((err) => {
            console.warn(err);
          });
        })
        .catch((err) => {
          if (parseInt(err.studentMessage, 10) === 404) {
            // Some data not found error
            return rejecter(404);
          }
          // Some other (internal server) error
          return rejecter(500);
        });
    });
  }
}
