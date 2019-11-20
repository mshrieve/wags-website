import GoogleSheet from 'google-spreadsheet'
import querystring from 'querystring'

require('dotenv').config({
  path: `.env`,
})

const handleSuccess = user =>
  console.log('success', user) || {
    statusCode: 200,
    body: JSON.stringify({
      authenticated: true,
      ...user,
    }),
  }

const handleReject = message => ({
  statusCode: 403,
  body: JSON.stringify({
    authenticated: false,
    message,
  }),
})

const doc = new GoogleSheet(process.env.SPREADSHEET_ID)
const credentials = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY.split('\\n').join('\n'),
}

const useServiceAccount = () =>
  new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(credentials, (error, result) =>
      error ? reject(error) : resolve(result)
    )
  })

const getInfo = () =>
  new Promise((resolve, reject) => {
    doc.getInfo((error, info) => (error ? reject(error) : resolve(info)))
  })

const getSheet = info =>
  new Promise((resolve, reject) => {
    const sheet = info.worksheets.find(sheet => sheet.title === 'People')
    sheet ? resolve(sheet) : reject()
  })

const getRows = sheet =>
  new Promise((resolve, reject) => {
    sheet.getRows((err, rows) => (err ? reject(err) : resolve(rows)))
  })

exports.handler = async (event, context) => {
  const { email, userId } = querystring.parse(event.body)
  if (!(email && userId)) return handleReject('missing email and/or id')
  console.log(userId, email)
  const user = await useServiceAccount()
    .then(() => getInfo())
    .then(info => getSheet(info))
    .then(sheet => getRows(sheet))
    .then(rows => rows.find(row => row.email == email))
    .then(row => ({
      // google-spreadsheet makes them lowercase :(
      userId: row.userid,
      firstName: row.firstname,
      lastName: row.lastname,
      institution: row.institution,
      position: row.position,
    }))

  console.log(user)
  if (user) {
    console.log(user)
    if (user.userId == userId) return handleSuccess(user)
    else return handleReject('wrong id')
  } else return handleReject('email not found')
}
