import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Input from '~/components/Input'
import Button from '~/components/Button'
import Select from '~/components/Select'
import { navigate } from '@reach/router'
import api from '~/services/api'
import Main from '~/components/Main'
import '~/pages/edit.css'
import '~/pages/global.css'

export const query = graphql`
  {
    institutions: allSheetsDirectory {
      distinct(field: institution)
    }
    positions: allSheetsDirectory {
      distinct(field: position)
    }
  }
`

const PROMPT = `Create new profile:`
const IndexPage = ({ data, location, pageContext }) => {
  const [values, setValues] = useState({})
  const [state, setState] = useState(0)
  const handleChange = event =>
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })

  // const options = {
  //   institutions: data.institutions.distinct.map(makeOption),
  //   positions: data.positions.distinct.map(makeOption),
  // }
  // const tagOptions = data.tags.distinct
  //   .reduce((options, tag) => [...options, ...tag.split(',')], [])
  //   .map(tag => ({
  //     value: tag,
  //     label: tag,
  //   }))

  // const handleSubmit = event => {
  //   event.preventDefault()
  //   console.log('submit')

  //   console.log(values)
  //   // this is to deal with the two types of values but i change
  //   const body = Object.keys(values)
  //     .map(key =>
  //       key === 'firstName' || key === 'lastName'
  //         ? { [key]: values[key] }
  //         : { [key]: values[key].value }
  //     )
  //     .reduce((prev, option) => ({ ...prev, ...option }), {})
  //   console.log(body)

  //   fetch('/.netlify/functions/create', {
  //     method: 'POST',
  //     body: querystring.stringify(body),
  //   }).then(response => {
  //     console.log(response, 'link somewhere!')
  //   })
  // }

  const handleSubmit = async e => {
    e.preventDefault()
    handleCreateUser(values)
  }

  const handleCreateUser = values => {
    console.log('creating user...', values)
    api.createUser(
      values,
      result => {
        console.log('created user', result)
        navigate('userCreated', { state: result })
      },
      result => {
        console.log('something went wrong', result)
      }
    )
  }

  // = async e => {
  //   e.preventDefault()
  //   userId ? handleCreateUser({ ...values, userId }) : handleGetId(values)
  // }

  // const handleCreateUser = values => {
  //   setMessage(`verifying`)

  //   api.createUser(
  //     values,
  //     result => {
  //       setMessage(`created user ${result.username}`)
  //     },
  //     result => {
  //       setMessage(result.message)
  //       setErrors({ username: true })
  //     },
  //     setLoading
  //   )
  // }

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        {/* <section className="edit__grid"> */}
        <section className="edit__grid">
          <h2>{PROMPT}</h2>
          <hr />
          <Input
            name="email"
            value={values['email']}
            onChange={handleChange}
            placeholder="Email"
          />
          <span>
            Your email will only be used to edit your information in the future.
            It won't be displayed in the directory.
          </span>
          <hr />
          <Input
            name="firstName"
            value={values['firstName']}
            onChange={handleChange}
            placeholder="First Name"
          />
          <Input
            name="lastName"
            value={values['lastName']}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <Select
            // options={institutionOptions}
            name="institution"
            value={values.institution}
            onChange={handleChange}
            placeholder={'Institution'}
          />
          <Select
            name="position"
            // options={positionOptions}
            value={values.position}
            onChange={handleChange}
            placeholder={'Position'}
          />
          <hr />
          <span>The following are optional:</span>
          <Input
            name="website"
            value={values['website']}
            onChange={handleChange}
            placeholder="Website"
          />
          <span>
            Add up to 3 'tags' indicating your research interests, affiliations,
            or anything else you'd like to share.
          </span>
          <Select
            name="tag1"
            // options={{}}
            value={values.tag1}
            onChange={handleChange}
            placeholder={'Tag 1'}
          />
          <Select
            name="tag2"
            // options={{}}
            value={values.tag2}
            onChange={handleChange}
            placeholder={'Tag 2'}
          />

          <Select
            name="tag3"
            // options={{}}
            value={values.tag3}
            onChange={handleChange}
            placeholder={'Tag 3'}
          />
          <hr />
          <div className="edit__buttons">
            <Button
              className="edit__left-button"
              type="button"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              className="edit__right-button"
              type="submit"
              // onClick={() => {}}
            >
              Create profile
            </Button>
          </div>
        </section>
      </form>
    </Main>
  )
}

export default IndexPage
