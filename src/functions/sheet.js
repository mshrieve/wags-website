import GoogleSheet from 'google-spreadsheet'
import querystring from 'querystring'
import fetch from 'node-fetch'

require('dotenv').config({
  path: `.env`,
})
const doc = new GoogleSheet(process.env.SPREADSHEET_ID)
const credentials = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY.split('\\n').join('\n'),
}

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = event.queryStringParameters.name
    ? event.queryStringParameters
    : querystring.parse(event.body)
  const {
    firstName = 'noname',
    lastName = '',
    position = '',
    institution = '',
    tag1,
    tag2,
    tag3,
  } = params
  console.log(event.body)
  console.log('p', params)
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
          const tagSheet = info.worksheets.find(sheet => sheet.title === 'Tags')
          peopleSheet.getRows(
            {
              offset: 1,
              limit: 20,
              orderby: 'col2',
            },
            function(err, rows) {
              console.log('Read ' + rows.length + ' rows')
            }
          )
          const tags = [tag1, tag2, tag3].filter(t => t)
          tags.map(t => tagSheet.addRow({ tag: t }))
          peopleSheet.addRow(
            {
              firstName,
              lastName,
              position,
              institution,
              tags: tags.join(','),
            },
            result => console.log(result)
          )
        }
      })
    }
  })

  // fetch(process.env.REBUILD_HOOK, {
  //   method: 'POST',
  //   body: { trigger_title: 'function trigger' },
  // })
  //   .then(res => res.json()) // expecting a json response
  //   .then(json => console.log(json))

  // return {
  //   statusCode: 200,

  //   body: `Hello`,
  // }
}
