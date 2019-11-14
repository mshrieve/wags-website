const querystring = require('querystring')

exports.handler = async (event, context) => {
  const { email, passcode } = querystring.parse(event.body)
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
