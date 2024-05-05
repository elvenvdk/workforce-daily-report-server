import AWS from "aws-sdk";
import nodemailer from "nodemailer";
import mimemessage from "mimemessage";
AWS.config.update({ region: "us-east-1" });
const mailer = nodemailer.createTransport({
    SES: new AWS.SES(),
});
const devMailUrl = "http://localhost:3000";
const prodMailUrl = "http://workforce-daily-report.com";
const style = {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    fontSize: "15px",
};
export const sendEmail = async (body, messageRecipent) => {
    console.log("BODY: ", body.code.toString()[0]);
    const params = {
        Destination: {
            ToAddresses: [messageRecipent],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
          <div>
            <h1>Bissetta & List</h1>
            <h2>Workforce Daily Report Authorization</h2>
            <a href="${prodMailUrl}/user-confirmation" />
            ${body?.text}
            <br />
            <br />
            <div style="${style}">
              <span style="'text-decoration': 'none'">${body.code.toString()[0]}</span>
              <span style="'text-decoration': 'none'">${body.code.toString()[2]}</span>
              <span style="'text-decoration': 'none'">${body.code.toString()[4]}</span>
              <span style="'text-decoration': 'none'">${body.code.toString()[6]}</span>
              <span style="'text-decoration': 'none'">${body.code.toString()[8]}</span>
              <span style="'text-decoration': 'none'">${body.code.toString()[10]}</span>
            </div>
          </div>`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Workforce Daily Report Email Confirmation",
            },
        },
        Source: "no-reply@workforce-daily-report.com",
        // Source: "vanderkuech@icloud.com",
    };
    const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();
    const data = await sendPromise;
    console.log("SEND EMAIL DATA: ", data);
    return data;
};
export const sendEmailWithAttachment = async (body, emailBody, messageRecipent, link) => {
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
    ses.sendRawEmail({
        RawMessage: { Data: mailContent.toString() },
    }, (err, sesdata) => {
        if (err) {
            console.log("AWS RAW EMAIL ERROR: ", err);
            return err;
        }
        else {
            console.log("SES DATA: ", sesdata);
            return sesdata;
        }
    });
};
