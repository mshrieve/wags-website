import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Select from 'react-select'
import { navigate } from '@reach/router'
import Main from '../components/Main'
import Header from '../components/Header'

import './index.css'

export const query = graphql`
  {
    institutions: allSheetsPeople {
      distinct(field: institution)
    }
    positions: allSheetsPeople {
      distinct(field: position)
    }
  }
`

const PositionsPage = ({ type, data }) => {
  const [values, setValues] = useState({})
  const handleChange = name => option =>
    console.log(option) ||
    setValues(values => ({
      ...values,
      [name]: option,
    }))

  const handleConfirm = () => {
    navigate('Filter', { state: { filter: getFilterState() } })
  }
  const getFilterState = () =>
    console.log(values) ||
    Object.keys(values).reduce(
      (state, param) => ({
        ...state,
        [param]: values[param].map(x => x.value),
      }),
      {}
    )

  return (
    <Main>
      <section className="index_grid">
        <Header text={`WAGS Directory`} />
        <section className="index_links">
          <section className="sub_header">
            <Link to={`/Filter`}>all</Link>
          </section>
          <form
            onSubmit={event => {
              handleConfirm()
              event.preventDefault()
            }}
          >
            <section className="index_section">
              <h2>positions: </h2>
              <Select
                isMulti="true"
                options={data.positions.distinct.map(position => ({
                  value: position,
                  label: position,
                }))}
                value={values['position']}
                name="position"
                onChange={handleChange('position')}
              />
            </section>

            <section className="index_section">
              <h2>institutions: </h2>
              <Select
                isMulti="true"
                options={data.institutions.distinct.map(institution => ({
                  value: institution,
                  label: institution,
                }))}
                value={values['institution']}
                name="institution"
                onChange={handleChange('institution')}
              />
            </section>
            <section className="index_section">
              <button type="submit"> hi </button>
            </section>
          </form>
        </section>
      </section>
    </Main>
  )
}
export default PositionsPage
