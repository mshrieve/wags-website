import * as yup from 'yup'

const email = yup
  .string()
  .email({ name: 'email', message: 'invalid email' })
  .required({ name: 'email', message: 'email is required' })

const userId = yup
  .string()
  .required({
    name: 'userId',
    message: 'userId is required',
  })
  .length(4, { name: 'userId', message: 'user id must have length 4' })

const tag = yup
  .string()
  .required({
    name: 'tag',
    message: 'tag is required',
  })
  .max(16, { name: 'tag', message: 'tag too long' })

const schema = {
  getId: yup.object({
    email,
  }),
  createUser: yup.object({
    email,
  }),
  getUser: yup.object({
    email,
    userId,
  }),
  editUser: yup.object({
    // maybe just needs userId
    email,
    userId,
    tag,
  }),
}

const validate = (values, schema) =>
  schema
    .validate(values, { abortEarly: false })
    .then(
      values => ({ valid: true, values }),
      errors => ({ valid: false, errors: errors.errors })
    )

const createUser = values => validate(values, schema.createUser)
const getId = values => validate(values, schema.getId)
const getUser = values => validate(values, schema.getUser)
const editUser = values => validate(values, schema.editUser)

export default {
  createUser,
  getId,
  getUser,
  editUser,
}
