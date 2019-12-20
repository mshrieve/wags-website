import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Select from '~/components/Select'
import Directory from '~/components/Directory'
import Main from '~/components/Main'

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
  const [directory, setDirectory] = useState(data.filtered.nodes)
  const tags = [
    ...data.tag1.distinct,
    ...data.tag2.distinct,
    ...data.tag3.distinct,
  ]

  // if values change, update the filter
  useEffect(
    () =>
      setEntries(
        // filter the entries
        directory.filter(entry =>
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
    [values, directory]
  )

  // enable the following to fetch very recent updates to the repository
  // useEffect(() => {
  //   fetch('/.netlify/functions/getDirectory')
  //     .then(result => result.json())
  //     .then(json => console.log(json) || setDirectory(json.directory))
  //     .catch(error => console.log(error))
  //   return undefined
  // }, [])

  const handleChange = event =>
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })

  const handleClear = event => {
    event.preventDefault()
    setValues({})
  }

  return (
    <Main>
      <section className="edit__grid">
        <h1>Welcome to the WAGS directory.</h1>

        <span>
          <Link to="/create">Create a new entry.</Link>
          {/* to be implemented ! */}
          {/* <Link className="line-through" to="/create">
            edit your information.
          </Link> */}
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
          isSearchable={false}
          name="position"
          options={data.positions.distinct}
          value={values['position']}
          placeholder={'Position'}
          onChange={handleChange}
        />
        <Select
          isSearchable={false}
          options={data.institutions.distinct}
          value={values.institution}
          name="institution"
          placeholder={'Institution'}
          onChange={handleChange}
        />
        <Select
          isSearchable={false}
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
