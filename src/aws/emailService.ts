import AWS, { AWSError } from "aws-sdk";
import { SendRawEmailResponse } from "aws-sdk/clients/ses";
import nodemailer from "nodemailer";
import mimemessage from "mimemessage";
import fs from "fs";

AWS.config.update({ region: "us-east-1" });
const mailer = nodemailer.createTransport({
  SES: new AWS.SES(),
});

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

export const sendEmail = async (body: any, messageRecipent: string) => {
  console.log("BODY: ", body);
  const params = {
    Destination: {
      ToAddresses: [
        // "vanderkuech@icloud.com",
        // "annecyops@gmail.com",
        messageRecipent,
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
          <a href="http://localhost:3000/user-confirmation" />
          ${body?.text}
          <br />
          <br />
          <p style="'text-align': 'center'">${body.code.join(" ")}</p>
          </div>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test email",
      },
    },
    // Source: "no-reply@notifications.workforce-daily-report.com",
    Source: "vanderkuech@icloud.com",
  };
  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();

  const data = await sendPromise;

  console.log("SEND EMAIL DATA: ", data);
  return data;
};

export const sendEmailWithAttachment = async (body: string, emailBody: string, messageRecipent: string, link?: URL) => {
  console.log("THE LINK: ", link);
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const mailContent = mimemessage.factory({ contentType: "multipart/mixed", body: [] });

  const mailRecipients = messageRecipent.split(",").join(", ");

  mailContent.header("From", "Bissetta & List <notifications.mail@workforce-daily-report.com>");
  // mailContent.header('To', `${messageRecipent}`);
  mailContent.header("To", mailRecipients);
  mailContent.header("Subject", "Checklist Report");

  const alternateEntity = mimemessage.factory({
    contentType: "multipart/alternate",
    body: [],
  });

  const htmlEntity = mimemessage.factory({
    contentType: "text/html;charset=utf-8",
    body: "   <html>  " + "   <head></head>  " + "   <body>  " + "   <h4>Hello</h4>  " + `<p>${emailBody}</p>` + `   <p>Please click this link to view, print, and save the <a href=${link}>Checklist PDF</a>.</p>  ` + `<a href=${link}>Checklist PDF</a>` + "   <p>BISSETTA & LIST, INC.</p>  " + "   <p>420 WEST 49th STREET</p>  " + "   <p>NEW YORK, NY 10019</p>  " + "   </body>  " + "  </html>  ",
  });
  // const plainEntity = mimemessage.factory({
  //   body: 'Please see the attached file for a list of    customers to contact.'
  // });

  // alternateEntity.body.push(plainEntity);
  alternateEntity.body.push(htmlEntity);

  mailContent.body.push(alternateEntity);

  // let data = fs.readFileSync('checklistreport.txt');
  let data = body;
  const attachmentEntity = mimemessage.factory({
    contentType: "text/plain",
    contentTransferEncoding: "base64",
    // body: data.toString('base64').replace(/([^\0]{76})/g, "$1\n")
    body: Buffer.from(data)
      .toString("base64")
      .replace(/([^\0]{76})/g, "$1\n"),
    // body: Buffer.from(data).toString('base64')
  });
  attachmentEntity.header("Content-Disposition", 'attachment ; filename="checklistreport.pdf"');

  // mailContent.body.push(attachmentEntity);

  ses.sendRawEmail(
    {
      RawMessage: { Data: mailContent.toString() },
    },
    (err: AWSError, sesdata: SendRawEmailResponse) => {
      if (err) {
        console.log("AWS RAW EMAIL ERROR: ", err);
        return err;
      } else {
        console.log("SES DATA: ", sesdata);
        return sesdata;
      }
    }
  );
};
