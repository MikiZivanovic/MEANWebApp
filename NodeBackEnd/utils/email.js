const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  
  const transpoter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '7b844a2618cbda',
      pass: 'c421001d21bab7',
    },
  });
  const emailoptions = {
    from: 'Miki Zivanovic <miki23@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transpoter.sendMail(emailoptions);
};
module.exports = sendEmail;
