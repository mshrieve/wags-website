import * as yup from 'yup'

const emailSchema = yup.object({
  email: yup.string().email({ name: 'email' }),
})

const email = email =>
  emailSchema.validate({ email }).then(({ email }) => true, errors => false)

export default {
  email,
}
