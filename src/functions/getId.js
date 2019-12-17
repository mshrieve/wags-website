import querystring from 'querystring'
import { generateId, getSheet, includes } from './utils/sheets'
import { reject, resolve } from './utils/handler'
require('dotenv').config({
  path: `.env`,
})

exports.handler = async (event, context) => {
  const { email } = querystring.parse(event.body)
  if (!email) return reject('no  email')
  console.log(email)
  const sheet = await getSheet()
  const emailExists = await includes(sheet, 'email', email)

  const id = await generateId(sheet).catch(error => console.log('error', error))

  if (emailExists) {
    return reject('email already exists')
  } else return resolve({ userId: id })
}
