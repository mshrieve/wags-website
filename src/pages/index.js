import React from 'react'
import { graphql, Link } from 'gatsby'

import './index.css'
import Main from '../components/Main'
import Header from '../components/Header'
export const query = graphql`
  query {
    allGoogleSheetPositionsRow(sort: { fields: type }) {
      nodes {
        type
        id
      }
    }
    allGoogleSheetInstitutionsRow(sort: { fields: name }) {
      nodes {
        name
        id
      }
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
          {data.allGoogleSheetPositionsRow.nodes.map(({ type, id }) => (
            <Link key={id} to={`/${type}`}>
              {type}
            </Link>
          ))}
        </section>
        <h3>by institution: </h3>
        <section className="index_section">
          {data.allGoogleSheetInstitutionsRow.nodes.map(({ name, id }) => (
            <Link key={id} to={`/${name}`}>
              {name}
            </Link>
          ))}
        </section>
      </section>
    </IndexGrid>
  </Main>
)

export default PositionsPage
