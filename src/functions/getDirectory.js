import { getSheet, getRows } from './utils/sheets'
import { reject, resolve } from './utils/handler'

exports.handler = async (event, context) => {
  const sheet = await getSheet()
  const directory = await getRows(sheet)

  console.log(directory)
  if (directory)
    return resolve({
      directory: directory.map(row => ({
        firstName: row.firstname,
        lastName: row.lastname,
        userId: row.userid,
        email: row.email,
        institution: row.institution,
        position: row.position,
        website: row.website,
        advisor: row.advisor,
        tag1: row.tag1,
        tag2: row.tag2,
        tag3: row.tag3,
      })),
    })
  else return reject(directory)
}
