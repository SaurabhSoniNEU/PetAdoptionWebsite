// services/EmailService.js
const nodemailer = require('nodemailer');
const Email = require('../models/Email');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'donald.mucharla1281@gmail.com',
        pass: 'donald@1281',
      },
    });
  }

  sendEmail(email) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: email.from,
        to: email.to,
        subject: email.subject,
        text: email.text,
      };

      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          reject('Internal Server Error');
        } else {
          console.log('Email sent: ' + info.response);
          resolve('Email sent successfully');
        }
      });
    });
  }
}

module.exports = EmailService;
