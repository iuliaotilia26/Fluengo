"use strict";
var fs = require('fs');
var path = require('path');
var Twig = require('twig');
var Mailgun = require('mailgun-js');
var config = require('config');
var mailgunConfig = config.get('mailgun');
var mailgun = Mailgun({
    domain: mailgunConfig.domain,
    apiKey: mailgunConfig.apiKey
});
/**
 * Loads a template and prepares it for usage
 * @param templateName string The template name
 * @return {Template} A template object
 */
function loadTemplate(templateName) {
    return Twig.twig({
        data: fs.readFileSync(path.join(__dirname, "../../resources/email-templates/" + templateName + ".twig"), 'utf-8')
    });
}
var templateLayout = loadTemplate('basic');
var templateStudent = loadTemplate('student_confirmation');
var templateTeacher = loadTemplate('teacher_confirmation');
var templateAccept = loadTemplate('accept_mail');
var templateReject = loadTemplate('reject_mail');
var templateCancelStudent = loadTemplate('cancel_student');
var templateCancelTeacher = loadTemplate('cancel_teacher');
/**
 * Enum of available template names
 * @type {{TEMPLATE_STUDENT: string; TEMPLATE_TEACHER: string}}
 */
exports.EmailNotificationTemplates = {
    TEMPLATE_STUDENT: 'TEMPLATE_STUDENT',
    TEMPLATE_TEACHER: 'TEMPLATE_TEACHER',
    TEMPLATE_ACCEPT: 'TEMPLATE_ACCEPT',
    TEMPLATE_REJECT: 'TEMPLATE_REJECT',
    TEMPLATE_CANCELSTUDENT: 'TEMPLATE_CANCELSTUDENT',
    TEMPLATE_CANCELTEACHER: 'TEMPLATE_CANCELTEACHER'
};
var templateMapping = {};
templateMapping[exports.EmailNotificationTemplates.TEMPLATE_STUDENT] = templateStudent;
templateMapping[exports.EmailNotificationTemplates.TEMPLATE_TEACHER] = templateTeacher;
templateMapping[exports.EmailNotificationTemplates.TEMPLATE_ACCEPT] = templateAccept;
templateMapping[exports.EmailNotificationTemplates.TEMPLATE_REJECT] = templateReject;
templateMapping[exports.EmailNotificationTemplates.TEMPLATE_CANCELSTUDENT] = templateCancelStudent;
templateMapping[exports.EmailNotificationTemplates.TEMPLATE_CANCELTEACHER] = templateCancelTeacher;
/**
 * Service used to send e-mail notifications
 */
var EmailNotificationService = (function () {
    function EmailNotificationService() {
    }
    /**
     * Sends an e-mail notification
     * @param recipient string The recipient of the e-mail
     * @param subject string The subject of the e-mail
     * @param template string The template to use for sending the e-mail
     * @param model {any} The view-bag (model) for the email data
     * @return {Promise<any>}
     */
    EmailNotificationService.prototype.sendEmail = function (recipient, subject, template, model) {
        if (!templateMapping[template]) {
            return Promise.reject("Template " + template + " not loaded");
        }
        var emailData = {
            from: mailgunConfig.from.name + " <" + mailgunConfig.from.email + ">",
            to: recipient,
            subject: subject,
            html: templateLayout.render({
                email_content: templateMapping[template].render(Object.assign({
                    root_url: config.get('rootUrl')
                }, model))
            })
        };
        return new Promise(function (resolver, rejecter) {
            mailgun.messages().send(emailData, function (error, body) { return (error ? rejecter(error) : resolver({
                response: body
            })); });
        });
    };
    return EmailNotificationService;
}());
exports.EmailNotificationService = EmailNotificationService;
//# sourceMappingURL=email-notification-service.js.map