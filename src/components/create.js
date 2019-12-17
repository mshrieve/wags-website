import GoogleSheet from 'google-spreadsheet'
import querystring from 'querystring'

require('dotenv').config({
  path: `.env`,
})

const handleSuccess = user =>
  console.log('success', user) || {
    statusCode: 200,
    body: JSON.stringify({
      created: true,
      ...user,
    }),
  }

const handleReject = message =>
  console.log('reject', message) || {
    statusCode: 403,
    body: JSON.stringify({
      created: false,
      message,
    }),
  }

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
    const sheet = info.worksheets.find(sheet => sheet.title === 'Directory')
    sheet ? resolve(sheet) : reject()
  })

const getRows = sheet =>
  new Promise((resolve, reject) => {
    sheet.getRows((err, rows) => (err ? reject(err) : resolve(rows)))
  })

const addRow = (sheet, data) =>
  new Promise((resolve, reject) => {
    sheet.addRow(data, (err, response) =>
      err ? reject(err) : resolve(response)
    )
  })

const getRandomChar = () => {
  const digit = Math.random() * 36
  return digit < 10
    ? String.fromCharCode(digit + 48)
    : String.fromCharCode(digit + 55)
}

const getRandomId = () => {
  let id = [...Array(3)].map(_ => getRandomChar())
  while (id.filter(char => char.charCodeAt(0) < 65).length == 0) {
    id = [...Array(3)].map(_ => getRandomChar())
  }
  return id.join('')
}

const generateId = sheet =>
  new Promise(async (resolve, reject) => {
    const ids = await getRows(sheet)
      .then(rows => rows.filter(user => user.userid))
      .then(rows => rows.map(user => user.userid))
      .catch(error => reject(error))

    const id = getRandomId()
    resolve(id)
  })

const doesEmailExist = (sheet, email) =>
  new Promise((resolve, reject) => {
    console.log('doesemailexist')
    getRows(sheet)
      .then(rows => rows.filter(user => user.email))
      .then(rows => rows.map(user => user.email))
      .then(emails => emails.includes(email))
      .then(result => resolve(result))
      .catch(error => reject(error))
  })

exports.handler = async (event, context) => {
  const sheet = await useServiceAccount()
    .then(() => getInfo())
    .then(info => getSheet(info))

  const emailDoesExist = await doesEmailExist(sheet, 'mshrieve@gmail.com')
  const id = await generateId(sheet)
    .then(id => console.log(id))
    .then(id)
    .catch(error => console.log('error', error))
  // .then(
  //   sheet =>
  //     console.log(sheet) ||
  //     // addRow needs a callback
  //     // returns the row
  //     addRow(sheet, {
  //       userid: 943205,
  //       firstname: 'charles',
  //       lastname: 'godfrey',
  //       institution: 'university of washington',
  //       position: 'graduate student',
  //     })
  // )
  // .then(response => console.log('addRow response: ', response))

  // .then(row => ({
  //   // google-spreadsheet makes them lowercase :(
  //   userId: row.userid,
  //   firstName: row.firstname,
  //   lastName: row.lastname,
  //   institution: row.institution,
  //   position: row.position,
  // }))
  if (emailDoesExist) {
    handleSuccess(id)
  } else return handleReject('email already exists')
}
