// hander.js
const AWS = require('aws-sdk');
const SES = new AWS.SES();

function sendEmail(formData, callback) {
    const emailParams = {
      Source: 'dharneanand92@gmail.com', // SES SENDING EMAIL
      ReplyToAddresses: [formData.reply_to],
      Destination: {
        ToAddresses: ['dharneanand92@gmail.com'], // SES RECEIVING EMAIL
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.reply_to}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'New message from Anands personal portfolio website',
        },
      },
    };
    SES.sendEmail(emailParams, callback);
  }
  
  module.exports.staticSiteMailer = (event, context, callback) => {
    const formData = JSON.parse(event.body);

    sendEmail(formData, function(err, data) {
      const response = {
        statusCode: err ? 500 : 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify({
          message: err ? err.message : data,
        }),
      };
  
      callback(null, response);
    });
  };