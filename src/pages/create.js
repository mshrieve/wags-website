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
    tag1: allSheetsDirectory {
      distinct(field: tag1)
    }
    tag2: allSheetsDirectory {
      distinct(field: tag2)
    }
    tag3: allSheetsDirectory {
      distinct(field: tag3)
    }
  }
`

const PROMPT = `Create new profile.`
const CreatePage = ({ data, location, pageContext }) => {
  const tags = [
    ...data.tag1.distinct,
    ...data.tag2.distinct,
    ...data.tag3.distinct,
  ]

  const [values, setValues] = useState({})
  const [state, setState] = useState(0)
  const handleChange = event =>
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })

  const handleSubmit = async e => {
    e.preventDefault()
    handleCreateUser(values)
  }

  const buttonDisabled = ({
    email,
    firstName,
    lastName,
    institution,
    position,
  }) =>
    [email, firstName, lastName, institution, position].some(
      value => !value || value.length == 0
    )

  const handleCreateUser = ({
    email,
    firstName,
    lastName,
    institution,
    position,
    website,
    advisor,
    tag1,
    tag2,
    tag3,
  }) => {
    console.log('creating user...', values)
    api.createUser(
      {
        email,
        firstName,
        lastName,
        institution,
        position,
        website,
        advisor,
        tag1,
        tag2,
        tag3,
      },
      result => {
        console.log('created user', result)
        navigate('userCreated', { state: result })
      },
      result => {
        console.log('something went wrong', result)
      }
    )
  }

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <section className="edit__grid">
          <h2>{PROMPT}</h2>
          <hr />
          <Input
            name="email"
            value={values['email']}
            onChange={handleChange}
            placeholder="Email"
            type="text"
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
            type="text"
          />
          <Input
            name="lastName"
            value={values['lastName']}
            onChange={handleChange}
            placeholder="Last Name"
            type="text"
          />
          <Select
            name="institution"
            creatable
            options={data.institutions.distinct}
            value={values.institution}
            onChange={handleChange}
            placeholder={'Institution'}
          />
          <Select
            name="position"
            creatable
            options={data.positions.distinct}
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
            type="text"
          />
          <Input
            name="advisor"
            value={values['advisor']}
            onChange={handleChange}
            placeholder="Advisor"
            type="text"
          />
          <span>
            Add up to 3 'tags' indicating your research interests, affiliations,
            or anything else you'd like to share.
          </span>
          <Select
            name="tag1"
            creatable
            options={tags.filter(
              tag => ![values.tag2, values.tag3].includes(tag)
            )}
            value={values.tag1}
            onChange={handleChange}
            placeholder={'Tag 1'}
          />
          <Select
            name="tag2"
            creatable
            options={tags.filter(
              tag => ![values.tag1, values.tag3].includes(tag)
            )}
            value={values.tag2}
            onChange={handleChange}
            placeholder={'Tag 2'}
          />
          <Select
            name="tag3"
            creatable
            options={tags.filter(
              tag => ![values.tag1, values.tag2].includes(tag)
            )}
            value={values.tag3}
            onChange={handleChange}
            placeholder={'Tag 3'}
          />
          <hr />
          <div className="edit__buttons">
            <Button
              className="edit__left-button"
              type="button"
              secondary
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              className="edit__right-button"
              type="submit"
              disabled={buttonDisabled(values)}
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

export default CreatePage
