const nodemailer = require('nodemailer');
const config = sails.config.mail;
const transporter = nodemailer.createTransport(config.nodemailer);

module.exports = {

  sendError: (...args) => {

    let message;
    let stack = '';

    if (args[0] instanceof Error) {
      stack = args.shift().stack;
    }

    message = JSON.stringify(args) + '\r\n' + stack;

    transporter.sendMail({
      from: config.from,
      to: config.support,
      subject: 'ERP Error',
      text: message,
    });

  }

};
