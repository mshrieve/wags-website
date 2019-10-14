import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Select from 'react-select'
import { navigate } from '@reach/router'
import queryString from 'query-string'
import './index.css'
import Main from '../components/Main'
import Header from '../components/Header'

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

const IndexGrid = ({ children }) => (
  <section className="index_grid">{children}</section>
)
const PositionsPage = ({ type, data }) => {
  const [values, setValues] = useState({})
  const handleChange = name => option =>
    console.log(option) ||
    setValues(values => ({
      ...values,
      [name]: option,
    }))
  const handleConfirm = () => {
    navigate('Filter', { state: { values } })
  }

  return (
    <Main>
      <IndexGrid>
        <Header text={`WAGS Directory`} />
        <section className="index_links">
          <section className="sub_header">
            <Link to={`/All`}>all</Link>
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
                value={values['positions']}
                name="positions"
                onChange={handleChange('positions')}
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
                name="insitutions"
                value={values['institutions']}
                name="institutions"
                onChange={handleChange('institutions')}
              />
            </section>
            <section className="index_section">
              <button type="submit"> hi </button>
            </section>
          </form>
        </section>
      </IndexGrid>
    </Main>
  )
}
export default PositionsPage
