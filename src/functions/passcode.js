import GoogleSheet from 'google-spreadsheet'
import querystring from 'querystring'

require('dotenv').config({
  path: `.env`,
})

const doc = new GoogleSheet(process.env.SPREADSHEET_ID)
const credentials = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY.split('\\n').join('\n'),
}

exports.handler = async (event, context) => {
  const { email, passcode } = querystring.parse(event.body)

  await doc.useServiceAccountAuth(credentials, (err, result) => {
    if (err) {
      console.log('use service account', err)
    } else {
      doc.getInfo((error, info) => {
        if (('get info', err)) {
          console.error(error)
        } else {
          const peopleSheet = info.worksheets.find(
            sheet => sheet.title === 'People'
          )
          peopleSheet.getRows(rows => console.log(rows))
        }
      })
    }
  })

  if (email == 'mshrieve@gmail.com')
    return {
      statusCode: 200,
      body: JSON.stringify({
        authenticated: true,
        id: passcode,
        email,
      }),
    }
  else
    return {
      statusCode: 403,
      body: JSON.stringify({
        authenticated: false,
      }),
    }
}
