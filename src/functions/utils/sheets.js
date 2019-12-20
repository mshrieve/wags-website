import GoogleSheet from 'google-spreadsheet'
require('dotenv').config({
  path: `.env`,
})

const doc = new GoogleSheet(process.env.SPREADSHEET_ID)
const credentials = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY.split('\\n').join('\n'),
}

const authenticateServiceAccount = () =>
  new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(credentials, (error, result) =>
      error ? reject(error) : resolve(result)
    )
  })

const getInfo = () =>
  new Promise((resolve, reject) => {
    doc.getInfo((error, info) => (error ? reject(error) : resolve(info)))
  })

const getSheet = () =>
  new Promise((resolve, reject) => {
    const sheet = authenticateServiceAccount()
      .then(() => getInfo())
      .then(info =>
        info.worksheets.find(
          sheet => sheet.title === process.env.SPREADSHEET_USER_DIRECTORY
        )
      )
    sheet ? resolve(sheet) : reject()
  })

const getRows = sheet =>
  new Promise((resolve, reject) => {
    sheet.getRows((err, rows) => (err ? reject(err) : resolve(rows)))
  })

const addRow = (sheet, data) =>
  new Promise((resolve, reject) => {
    sheet.addRow(data, (err, { _xml, _links, id, save, del, ...rest }) =>
      err ? reject(err) : resolve(rest)
    )
  })

// by userId
const getRow = (sheet, rowId) =>
  new Promise((resolve, reject) => {
    getRows(sheet)
      .then(rows => {
        // watch out for lowercase :()
        const row = rows.find(row => row.userid === rowId)
        if (row) resolve(row)
        else reject('row not found')
      })
      .catch(error => reject(error))
  })

const getRandomChar = () => {
  const digit = Math.random() * 36
  return digit < 10
    ? String.fromCharCode(digit + 48)
    : String.fromCharCode(digit + 55)
}

// id is length 4 with letters and digits and exactly two digits
const getRandomId = ids => {
  let id = [...Array(4)].map(_ => getRandomChar())
  while (
    id.filter(char => char.charCodeAt(0) < 65).length != 2 ||
    ids.includes(id.join(''))
  ) {
    id = [...Array(4)].map(_ => getRandomChar())
  }
  return id.join('')
}

// what's going on here ?
const generateId = sheet =>
  new Promise(async (resolve, reject) => {
    // get all the ids but we dont do anything with them.
    const ids = await getRows(sheet)
      .then(rows => rows.filter(user => user.userid))
      .then(rows => rows.map(user => user.userid))
      .catch(error => reject(error))

    console.log('ids: ', ids)
    const id = getRandomId(ids)
    resolve(id)
  })

const includes = (sheet, key, value) =>
  new Promise((resolve, reject) => {
    getRows(sheet)
      .then(rows => rows.filter(user => user[key]))
      .then(rows => rows.map(user => user[key]))
      .then(values => values.includes(value))
      .then(result => resolve(result))
      .catch(error => reject(error))
  })

export { getSheet, getRows, addRow, getRow, generateId, includes }
