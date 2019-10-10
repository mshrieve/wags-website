import React from 'react'
import { graphql, Link } from 'gatsby'
import Select from 'react-select'

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
const PositionsPage = ({ type, data }) => (
  <Main>
    <IndexGrid>
      <Header text={`WAGS Directory`} />
      <section className="index_links">
        <section className="sub_header">
          <Link to={`/All`}>all</Link>
        </section>
        <form
          onSubmit={event => {
            console.log(event)
            event.preventDefault()
          }}
        >
          <section className="index_section">
            <h2>positions: </h2>
            <Select
              options={data.positions.distinct.map(position => ({
                value: position,
                label: position,
              }))}
            />
          </section>

          <section className="index_section">
            <h2>institutions: </h2>
            <Select
              options={data.institutions.distinct.map(institution => ({
                value: institution,
                label: institution,
              }))}
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

export default PositionsPage
