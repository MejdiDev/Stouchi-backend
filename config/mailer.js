'use strict';
const nodemailer = require ('nodemailer');

//
const transporter = nodemailer.createTransport({
  service :'gmail',
  host : 'smpt.gmail.com',
  port : 465,
  secure : true,
  auth: {
    user:'moneyminder84@gmail.com',
    pass:'moneyminder2023'
  }
})

module.exports = transporter;