const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const CLIENT_ID = "278168791596-rfmsm9itsgno5umvvl6vrkj86t9ecuad.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const refresh_token= '1//04c2hA7YBWVL_CgYIARAAGAQSNwF-L9Ir15ZRMzhPUCf2442QDAvFDfBQIe95Dcilk3slpFKPSvVMG4c6U3bGfxWM8eoLcZHAA4s'

const oAuth2Client =  new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token:refresh_token});




async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'yours authorised email address',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: refresh_token,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'SENDER NAME <yours authorised email address@gmail.com>',
        to: 'to email address here',
        subject: 'Hello from gmail using API',
        text: 'Hello from gmail email using API',
        html: '<h1>Hello from gmail email using API</h1>',
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
  
  sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));