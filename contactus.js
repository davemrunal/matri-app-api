const AWS = require('aws-sdk');
const SES = new AWS.SES();

export const staticMailer = (event, context, callback) => {
    console.log("davem is in function body");
    const formData = JSON.parse(event.body);
    console.log(event.body);
    sendEmail(formData, function(err, data) {
        const response = {
            statusCode: err ? 500 : 200,
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': 'https://master.d3inofo3le5r0t.amplifyapp.com',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            body: JSON.stringify({
                message: err ? err.message : data,
            }),
        };

        callback(null, response);
    });

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

const sendEmail = (formData, callback) => {
    console.log("inside formdata");
    console.log(formData.email);
    const emailParams = {
        Source: 'davemrunal93@gmail.com', // SES SENDING EMAIL
        ReplyToAddresses: [formData.email],
        Destination: {
            ToAddresses: ['davemrunal93@gmail.com'], // SES RECEIVING EMAIL
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: `\nName: ${formData.name}\nEmail: ${formData.email}\nLocation: ${formData.location}\nPhoneCountry: ${formData.phoneNumberCountry}\nPhoneNumber: ${formData.phoneNumber}\n\nMessage: \n${formData.message}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'New message from your site',
            },
        },
    };

    console.log(emailParams);
    console.log("about to call sendemail");
    SES.sendEmail(emailParams, callback);
    console.log("after calling sendemail");
};
