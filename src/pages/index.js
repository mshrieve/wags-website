import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Select from '~/components/Select'
import Directory from '~/components/Directory'
import { navigate } from '@reach/router'
import Main from '../components/Main'

import './edit.css'

export const query = graphql`
  {
    institutions: allSheetsDirectory {
      distinct(field: institution)
    }
    positions: allSheetsDirectory {
      distinct(field: position)
    }
    filtered: allSheetsDirectory(sort: { fields: lastName }) {
      nodes {
        firstName
        lastName
        id
        institution
        position
        website
      }
    }
  }
`

const filterNodes = (nodes, filter) =>
  console.log(filter) || filter
    ? nodes.filter(node =>
        Object.keys(filter)
          .map(
            param =>
              console.log(param, filter, node[param]) ||
              (filter[param] && filter[param].includes(node[param]))
          )
          .every(x => x)
      )
    : nodes

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
          Object.keys(values).every(key =>
            values[key] ? entry[key] === values[key] : true
          )
        )
      ),
    [values]
  )

  useEffect(() => console.log(entries, values), [entries, values])

  const handleChange = event =>
    console.log(event) ||
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })

  return (
    <Main>
      <section className="edit__grid">
        <h1>WAGS Directory</h1>
        <hr />
        <span>
          Welcome to the WAGS directory.
          <br />
          <Link to="/create">Create a new entry</Link>
          {', '}
          <Link to="/create">edit your information</Link>, or browse the
          directory below, optionally filtering by one or more criteria.
        </span>
        <hr />
        <Select
          isMulti="true"
          options={data.positions.distinct}
          value={values['position']}
          name="position"
          placeholder={'Position'}
          onChange={handleChange}
        />
        <Select
          isMulti="true"
          options={data.institutions.distinct}
          value={values.institution}
          name="institution"
          placeholder={'Institution'}
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
