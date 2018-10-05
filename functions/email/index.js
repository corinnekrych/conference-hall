/* eslint-disable no-console */
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

// retrieve credentials from GCE
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
})

module.exports = (config, { to, subject, html }) => {
  const mailOptions = {
    from: 'Conference Hall <no-reply@gmail.com>',
    to,
    subject,
    html,
  }
  console.log('New welcome email sent to:', mailOptions)
  return mailTransport.sendMail(mailOptions)
}
