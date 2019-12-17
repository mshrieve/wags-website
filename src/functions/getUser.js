import querystring from 'querystring'
import { getSheet, getRows } from './utils/sheets'
import { reject, resolve } from './utils/handler'

exports.handler = async (event, context) => {
  const { email, userid } = querystring.parse(event.body)
  if (!(email && userid)) return reject('missing email and/or id')
  console.log(userid, email)
  const sheet = await getSheet()
  const user = await getRows(sheet)
    .then(rows => rows.find(row => row.email === email))
    .then(row => ({
      // google-spreadsheet makes them lowercase :(
      userid: row.userid,
      email: row.email,
      username: row.username,
    }))

  if (user) {
    console.log(user)
    if (user.userid === userid) return resolve(user)
    else return reject('wrong id')
  } else return reject('email not found')
}
