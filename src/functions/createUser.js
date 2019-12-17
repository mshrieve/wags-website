import text from './utils/text'
import { getSheet, includes, addRow, generateId } from './utils/sheets'
import { reject, resolve } from './utils/handler'

// CREATE USER
exports.handler = async (event, context) => {
  const {
    email,
    firstName,
    lastName,
    institution,
    position,
    website,

    tag1,
    tag2,
    tag3,
  } = JSON.parse(event.body)

  if (!email) return reject(text.EMAIL_MISSING)
  // if (!userId) return reject(text.ID_MISSING)
  // if (!username) return reject(text.USERNAME_MISSING)

  // generate userId
  const sheet = await getSheet()

  console.log('sheet: ', sheet)
  const userId = await generateId(sheet)

  // const emailExists = await includes(sheet, 'email', email)
  // if (emailExists) return reject(text.EMAIL_EXISTS)

  // const userIdExists = await includes(sheet, 'userid', userId)
  // if (userIdExists) return reject(text.ID_EXISTS)

  // const usernameExists = await includes(sheet, 'username', username)
  // if (usernameExists) return reject(text.USERNAME_EXISTS)

  // const userIdValid = userId.length === 4
  // if (!userIdValid) return reject(text.ID_INVALID)

  return await addRow(sheet, {
    email,
    userid: userId,
    firstname: firstName,
    lastname: lastName,
    institution,
    position,
    website,
    tag1,
    tag2,
    tag3,
  })
    .then(
      ({
        email,
        userid,
        firstname,
        lastname,
        institution,
        position,
        website,
        tag1,
        tag2,
        tag3,
      }) =>
        console.log('user created success ' + email) ||
        resolve({
          email,
          userId: userid,
          firstName: firstname,
          lastName: lastname,
          institution,
          position,
          website,
          tag1,
          tag2,
          tag3,
        })
    )
    .catch(error => console.log('error', error) || reject(error))
}
