const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transport = nodemailer.createTransport({
    host: process.env.host,
    port: process.env.port,
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  })
  
  transport.use(
    "compile",
    hbs({
      viewEngine: {
      extname: '.handlebars', // handlebars extension
      layoutsDir: 'email/layouts/', // location of handlebars templates
      defaultLayout: 'emailTemplate', // name of main template
  },
  viewPath: 'email',
  extName: '.handlebars',
  }))

  module.exports = transport