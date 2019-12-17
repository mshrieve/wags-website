const resolve = body => ({
  statusCode: 200,
  body: JSON.stringify({
    success: true,
    ...body,
  }),
})

const reject = message => ({
  statusCode: 403,
  body: JSON.stringify({
    success: false,
    message,
  }),
})

export { resolve, reject }
