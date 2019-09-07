import React from 'react'
import { graphql, Link } from 'gatsby'

import './position.css'
import Main from '../components/Main'

export const query = graphql`
  query {
    allGoogleSheetPositionsRow {
      nodes {
        type
        id
      }
    }
    allGoogleSheetInstitutionsRow {
      nodes {
        name
        id
      }
    }
  }
`

const IndexGrid = ({ children }) => (
  <section className="indexGrid">{children}</section>
)
const PositionsPage = ({ type, data }) => (
  <Main>
    <IndexGrid>
      <h1>WAGS Directory</h1>
      <section className="links">
        <Link to={`/All`}>all</Link>
        <h3>by position: </h3>
        <section className="linkSection">
          {data.allGoogleSheetPositionsRow.nodes.map(({ type, id }) => (
            <Link key={id} to={`/${type}`}>
              {type}
            </Link>
          ))}
        </section>
        <h3>by institution: </h3>
        <section className="linkSection">
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
