const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config()

/**
 * Purpose      :   This sevice file is for nodemailer logic .
 * @file        :   sendMailService.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   23-09-2019
 **/

const sendMail = (url) => {
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password
        }
    }));

    const mailOptions = {
        from: process.env.email,
        to: process.env.email,
        subject: 'link to forgot the password',
        text: url
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log(err)
        else
            console.log(info)
    })

}

module.exports = {
    sendMail
};
