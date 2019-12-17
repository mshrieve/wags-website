import schema from './schema'

const endpoint = {
  getId: '/.netlify/functions/getId',
  createUser: '/.netlify/functions/createUser',
  getUser: '/.netlify/functions/getUser',
  editUser: '/.netlify/functions/editUser',
}
const post = (values, endpoint) =>
  fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(values),
  })
    .then(response => response.json())
    .catch(error => console.error('error', error))

const request = (validate, endpoint) => (values, handleSuccess, handleError) =>
  validate(values).then(result => {
    console.log('endpoint', endpoint)
    console.log('values: ', values)
    console.log('result: ', result)
    if (result.valid)
      return post(values, endpoint).then(({ success, ...result }) =>
        success ? handleSuccess(result) : handleError(result)
      )
    // errors = [{name, message},...]
    else handleError(result.errors[0])
  })

const getId = request(schema.getId, endpoint.getId)
const createUser = request(schema.createUser, endpoint.createUser)
const getUser = request(schema.getUser, endpoint.getUser)
const editUser = request(schema.editUser, endpoint.editUser)

const api = {
  getId,
  createUser,
  getUser,
  editUser,
}

export default api
