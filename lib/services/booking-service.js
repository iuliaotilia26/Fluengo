/**
 * Created by Iulia Mustea on 11/11/2016.
 */
"use strict";
var uuid = require('node-uuid');
var db_1 = require("../db");
var email_notification_service_1 = require('./email-notification-service');
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
var BookingService = (function () {
    function BookingService() {
    }
    /**
     * Performs a booking
     * @param teacherId
     * @param studentName
     * @param studentEmail
     * @param when
     * @param studentMessage
     * @return {Promise<any>}
     */
    BookingService.prototype.performBooking = function (_a) {
        var teacherId = _a.teacherId, studentId = _a.studentId, studentName = _a.studentName, studentEmail = _a.studentEmail, when = _a.when, studentMessage = _a.studentMessage;
        var teacherLink = generateLink();
        var studentLink = generateLink();
        var createdAt = new Date();
        return new Promise(function (resolver, rejecter) {
            return db_1.knex('booking').insert({
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
                .catch(function (err) { return Promise.reject(new Error('Could not save booking')); })
                .then(function () { return db_1.knex.select('name', 'email').from('teacher')
                .where('id', teacherId); })
                .catch(function (err) { return Promise.reject(new Error('Could not search for teacher')); })
                .then(function (data) {
                if (data.length === 0) {
                    return Promise.reject(new Error(404));
                }
                data = data[0];
                // Resolve early for the HTTP client
                resolver(data);
                var teacherEmail = data.email;
                //mail pt teacher
                if (teacherEmail) {
                    new email_notification_service_1.EmailNotificationService().sendEmail(teacherEmail, 'Booking request received', email_notification_service_1.EmailNotificationTemplates.TEMPLATE_TEACHER, {
                        student: studentName,
                        date_booking: when,
                        message_send: studentMessage,
                        teacher_link: teacherLink
                    }).then(function (result) {
                        console.log(result.response);
                    }).catch(function (err) {
                        console.warn(err);
                    });
                }
                //mail pt student
                new email_notification_service_1.EmailNotificationService().sendEmail(studentEmail, 'Booking request confirmation', email_notification_service_1.EmailNotificationTemplates.TEMPLATE_STUDENT, {
                    date_booking: when,
                    name_teacher: data.name,
                    student_link: studentLink
                }).then(function (result) {
                    console.log(result.response);
                }).catch(function (err) {
                    console.warn(err);
                });
            })
                .catch(function (err) {
                if (parseInt(err.studentMessage, 10) === 404) {
                    // Some data not found error
                    return rejecter(404);
                }
                // Some other (internal server) error
                return rejecter(500);
            });
        });
    };
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=booking-service.js.map