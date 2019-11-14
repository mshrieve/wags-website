import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
// import useAuth from '~/context/auth'
import Input from '~/components/Input'
import Button from '~/components/Button'
import Select from '~/components/Select'
import querystring from 'querystring'
import './edit.css'
import './global.css'

export const query = graphql`
  {
    people: allSheetsPeople {
      nodes {
        firstName
        lastName
        position
        institution
      }
    }
    institutions: allSheetsPeople {
      distinct(field: institution)
    }
    positions: allSheetsPeople {
      distinct(field: position)
    }
  }
`

const IndexPage = ({ data }) => {
  const [values, setValues] = useState({})
  const handleChange = event =>
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })

  const handleSelectChange = name => option =>
    setValues(values => ({
      ...values,
      [name]: option,
    }))

  const makeOption = value => ({
    value,
    label: value,
  })

  const institutionOptions = data.institutions.distinct.map(makeOption)
  const positionOptions = data.positions.distinct.map(makeOption)
  // const tagOptions = data.tags.distinct
  //   .reduce((options, tag) => [...options, ...tag.split(',')], [])
  //   .map(tag => ({
  //     value: tag,
  //     label: tag,
  //   }))

  const handleSubmit = event => {
    event.preventDefault()

    console.log(values)
    const body = Object.keys(values)
      .map(key =>
        key === 'firstName' || key === 'lastName'
          ? { [key]: values[key] }
          : { [key]: values[key].value }
      )
      .reduce((prev, option) => ({ ...prev, ...option }), {})
    console.log(body)

    fetch('/.netlify/functions/email', {
      method: 'POST',
      body: querystring.stringify(body),
    }).then(response => {
      console.log(response, 'link somewhere!')
    })
  }

  return (
    <main className="edit__main">
      <form className="edit__form" onSubmit={handleSubmit}>
        <section className="edit__grid">
          <section className="edit__input-section">
            <span className="edit__email">hi</span>
            <Input
              name="firstName"
              value={values['firstName']}
              onChange={handleChange}
              placeholder="First Name"
              tip="First Name"
            />
            <Input
              name="lastName"
              value={values['lastName']}
              onChange={handleChange}
              placeholder="Last Name"
              tip="Last Name"
            />
            <Select
              options={institutionOptions}
              value={values.institution}
              onChange={handleSelectChange('institution')}
              placeholder={'institution'}
            />
            <Select
              options={positionOptions}
              value={values.position}
              onChange={handleSelectChange('position')}
              placeholder={'position'}
            />
            <Select
              // options={{}}
              value={values.tag1}
              onChange={handleSelectChange('tag1')}
              placeholder={'tag'}
            />
            <Select
              // options={{}}
              value={values.tag2}
              onChange={handleSelectChange('tag2')}
              placeholder={'tag'}
            />
            <Select
              // options={{}}
              value={values.tag3}
              onChange={handleSelectChange('tag3')}
              placeholder={'tag'}
            />
            tags
            <hr />
            <Button
              className="edit__login-button"
              type="submit"
              // onClick={() => {}}
            >
              new entry
            </Button>
          </section>
        </section>
      </form>
    </main>
  )
}

export default IndexPage