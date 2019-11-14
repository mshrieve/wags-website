import GoogleSheet from 'google-spreadsheet'
import querystring from 'querystring'

require('dotenv').config({
  path: `.env`,
})

const handleSuccess = ({ id, email }) => ({
  statusCode: 200,
  body: JSON.stringify({
    authenticated: true,
    id,
    email,
  }),
})

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
  const { email, passcode } = querystring.parse(event.body)
  if (!(email && passcode)) return handleReject('missing email and/or id')

  console.log('hi')
  useServiceAccount()
    .then(() => getInfo())
    .then(info => getSheet(info))
    .then(sheet => getRows(sheet))
    .then(
      rows =>
        console.log('rows', rows) ||
        rows.find(row => row.email == 'mshrieve@gmail.com')
    )
    .then(row => console.log(handleSuccess(row)) || row)
    .then(row => (row ? handleSuccess(row) : handleReject()))
}
