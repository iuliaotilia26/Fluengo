import * as fs from 'fs';
import * as path from 'path';

import * as Twig from 'twig';
import * as Mailgun from 'mailgun-js';
import * as config from 'config';

const mailgunConfig = config.get('mailgun');
const mailgun = Mailgun({
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
    data: fs.readFileSync(path.join(__dirname, `../../resources/email-templates/${templateName}.twig`), 'utf-8')
  });
}

const templateLayout = loadTemplate('basic');
const templateStudent = loadTemplate('student_confirmation');
const templateTeacher = loadTemplate('teacher_confirmation');
const templateAccept = loadTemplate('accept_mail');
const templateReject = loadTemplate('reject_mail');
const templateCancelStudent = loadTemplate('cancel_student');
const templateCancelTeacher = loadTemplate('cancel_teacher');

/**
 * Enum of available template names
 * @type {{TEMPLATE_STUDENT: string; TEMPLATE_TEACHER: string}}
 */
export const EmailNotificationTemplates = {
  TEMPLATE_STUDENT: 'TEMPLATE_STUDENT',
  TEMPLATE_TEACHER: 'TEMPLATE_TEACHER',
  TEMPLATE_ACCEPT: 'TEMPLATE_ACCEPT',
  TEMPLATE_REJECT: 'TEMPLATE_REJECT',
  TEMPLATE_CANCELSTUDENT:'TEMPLATE_CANCELSTUDENT',
  TEMPLATE_CANCELTEACHER:'TEMPLATE_CANCELTEACHER'

};

const templateMapping: { [id: string] : any} = {};
templateMapping[EmailNotificationTemplates.TEMPLATE_STUDENT] = templateStudent;
templateMapping[EmailNotificationTemplates.TEMPLATE_TEACHER] = templateTeacher;

templateMapping[EmailNotificationTemplates.TEMPLATE_ACCEPT] = templateAccept;
templateMapping[EmailNotificationTemplates.TEMPLATE_REJECT] = templateReject;
templateMapping[EmailNotificationTemplates.TEMPLATE_CANCELSTUDENT] = templateCancelStudent;
templateMapping[EmailNotificationTemplates.TEMPLATE_CANCELTEACHER] = templateCancelTeacher;
/**
 * Service used to send e-mail notifications
 */
export class EmailNotificationService {
  /**
   * Sends an e-mail notification
   * @param recipient string The recipient of the e-mail
   * @param subject string The subject of the e-mail
   * @param template string The template to use for sending the e-mail
   * @param model {any} The view-bag (model) for the email data
   * @return {Promise<any>}
   */
  public sendEmail(recipient, subject, template, model): Promise<any> {
    if (!templateMapping[template]) {
      return Promise.reject(`Template ${template} not loaded`);
    }

    const emailData = {
      from: `${mailgunConfig.from.name} <${mailgunConfig.from.email}>`,
      to: recipient,
      subject: subject,
      html: templateLayout.render({
        email_content: templateMapping[template].render(Object.assign({
          root_url: config.get('rootUrl')
        }, model))
      })
    };

    return new Promise((resolver, rejecter) => {
      mailgun.messages().send(emailData, (error, body) => (error ? rejecter(error) : resolver({
        response: body
      })));
    });
  }
}
