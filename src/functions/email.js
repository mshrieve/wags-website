var nodemailer = require('nodemailer')
require('dotenv').config({
  path: `.env`,
})

exports.handler = async (event, context) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'wagsdirectory@gmail.com',
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    var mailOptions = {
      from: 'wagsdirectory@gmail.com',
      to: 'mshrieve@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
    }

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })

    return { statusCode: 200, body: 'email sent' }
  } catch (e) {
    console.log(e)
  }
}
