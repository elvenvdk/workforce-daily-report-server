import AWS from "aws-sdk";
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
export const sendEmail = async (body) => {
    console.log('BODY: ', body);
    console.log('HELLO THIS IS GETTING THERE...');
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
