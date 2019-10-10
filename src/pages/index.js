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
        <Link to={`/All`}>all</Link>
        <h3>by position: </h3>
        <section className="index_section">
          {data.positions.distinct.map(position => (
            <Link to={`/${position}`}>{position}</Link>
          ))}
          <Select
            options={data.positions.distinct.map(position => ({
              value: position,
              label: position,
            }))}
          />
        </section>
        <h3>by institution: </h3>
        <section className="index_section">
          {data.institutions.distinct.map(institution => (
            <Link to={`/${institution}`}>{institution}</Link>
          ))}
        </section>
      </section>
    </IndexGrid>
  </Main>
)

export default PositionsPage
