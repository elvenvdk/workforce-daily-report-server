import AWS, { AWSError } from "aws-sdk";
import { SendRawEmailResponse } from "aws-sdk/clients/ses";
import mimemessage from 'mimemessage';
import fs from 'fs';

AWS.config.update({ region: "us-east-1" });

const namesArr = ["alvin", "fedner", "margaret", "lilly"];

const params = {
  Destination: {
    ToAddresses: [
      // "vanderkuech@icloud.com",
      "annecyops@gmail.com",
      // 'fedner@bissettalist.com'
    ],
  },
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: `
        <div>
        <h1>This is a test</h1>
        <ul>
        ${namesArr.map(name => `<li>${name}</li>`)}
        </ul>
        </div>`,
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Test email",
    },
  },
  Source: "no-reply@notifications.workforce-daily-report.com",
};

export const sendEmail = async (body: any) => {
  console.log('BODY: ', body);
  console.log('HELLO THIS IS GETTING THERE...')
  const params = {
    Destination: {
      ToAddresses: [
        // "vanderkuech@icloud.com",
        "annecyops@gmail.com",
        // 'fedner@bissettalist.com'
      ],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <div>
          <h1>This is a test</h1>
          ${body}
          </div>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test email",
      },
    },
    // Source: "no-reply@notifications.workforce-daily-report.com",
    Source: "vanderkuech@icloud.com"
  };
  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();

  const data = await sendPromise;

  console.log("SEND EMAIL DATA: ", data);
};

export const sendEmailWithAttachment = async (body: any, messageRecipent?: string) => {
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const mailContent = mimemessage.factory({ contentType: 'multipart/mixed', body: [] });

  mailContent.header('From', 'Bissetta & List <notifications.workforce-daily-report.com');
  mailContent.header('To', `${'vanderkuech@icloud.com'}`);
  mailContent.header('Subject', 'Checklist Report');

  const alternateEntity = mimemessage.factory({
    contentType: 'multipart/alternate',
    body: []
  })

  const htmlEntity = mimemessage.factory({
    contentType: 'text/html;charset=utf-8',
    body: '   <html>  ' +
      '   <head></head>  ' +
      '   <body>  ' +
      '   <h1>Hello!</h1>  ' +
      '   <p>Please see the attached file for a list of    customers to contact.</p>  ' +
      '   </body>  ' +
      '  </html>  '
  });
  const plainEntity = mimemessage.factory({
    body: 'Please see the attached file for a list of    customers to contact.'
  });

  alternateEntity.body.push(plainEntity);
  alternateEntity.body.push(htmlEntity);

  mailContent.body.push(alternateEntity);

  let data = fs.readFileSync('checklistreport.txt');
  const attachmentEntity = mimemessage.factory({
    contentType: 'text/plain',
    contentTransferEncoding: 'base64',
    body: data.toString('base64').replace(/([^\0]{76})/g, "$1\n")
  });
  attachmentEntity.header('Content-Disposition', 'attachment ;filename="checklistreport.txt"');

  mailContent.body.push(attachmentEntity);

  ses.sendRawEmail({
    RawMessage: { Data: mailContent.toString() }
  }, (err: AWSError, sesdata: SendRawEmailResponse) => {
    if (err) {
      console.log('AWS RAW EMAIL ERROR: ', err);
    }
    else {
      console.log('SES DATA RESPONSE: ', sesdata);
    }
  });
}



