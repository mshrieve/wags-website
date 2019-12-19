import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Select from '~/components/Select'
import Directory from '~/components/Directory'
import { navigate } from '@reach/router'
import Main from '~/components/Main'
import Button from '~/components/Button'

import './edit.css'
import './global.css'

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
    filtered: allSheetsDirectory(sort: { fields: lastName }) {
      nodes {
        firstName
        lastName
        id
        institution
        position
        website
        tag1
        tag2
        tag3
      }
    }
  }
`

const checkTags = (node, tag) => [node.tag1, node.tag2, node.tag3].includes(tag)

const IndexPage = ({ data, location }) => {
  const [values, setValues] = useState({})
  const [entries, setEntries] = useState(data.filtered.nodes)

  // if values change, update the filter
  useEffect(
    () =>
      setEntries(
        // filter the entries
        data.filtered.nodes.filter(entry =>
          // making sure the values on  the entry match the values on  the values :D
          [
            values.position ? entry.position === values.position : true,
            values.institution
              ? entry.institution === values.institution
              : true,
            values.tag ? checkTags(entry, values.tag) : true,
          ].every(x => x)
        )
      ),
    [values]
  )

  useEffect(() => console.log(entries, values), [entries, values])

  const handleChange = event =>
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })

  const handleClear = event => {
    event.preventDefault()
    setValues({})
  }

  const tags = [
    ...data.tag1.distinct,
    ...data.tag2.distinct,
    ...data.tag3.distinct,
  ]

  return (
    <Main>
      <section className="edit__grid">
        <h1>Welcome to the WAGS directory.</h1>

        <span>
          <Link to="/create">Create a new entry</Link>
          {' or '}
          <Link to="/create">edit your information.</Link>
        </span>
        <hr />
        <section className="horizontal-grid">
          <h3>Filter results:</h3>
          {[values.position, values.institution, values.tag].some(x => x) && (
            <a href="" className="align-right" onClick={handleClear}>
              clear
            </a>
          )}
        </section>
        <Select
          options={data.positions.distinct}
          value={values['position']}
          name="position"
          placeholder={'Position'}
          onChange={handleChange}
        />
        <Select
          options={data.institutions.distinct}
          value={values.institution}
          name="institution"
          placeholder={'Institution'}
          onChange={handleChange}
        />
        <Select
          options={tags}
          value={values.tag}
          name="tag"
          placeholder={'Tag'}
          onChange={handleChange}
        />
        <hr />

        {entries.length > 0 ? (
          <Directory people={entries} />
        ) : (
          <span>No entries match the filter.</span>
        )}
      </section>
    </Main>
  )
}
export default IndexPage
