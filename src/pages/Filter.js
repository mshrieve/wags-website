import React from 'react'
import { graphql } from 'gatsby'

import Main from '../components/Main'
import Directory from '../components/Directory'
import IndexGrid from '../components/IndexGrid'
import Header from '../components/Header'

export const query = graphql`
  {
    filtered: allSheetsPeople(sort: { fields: lastName }) {
      nodes {
        firstName
        lastName
        id
        institution
        position
      }
    }
  }
`

const ByFilter = ({ data, location }) => {
  const positions = location.state.values.positions
    ? location.state.values.positions.map(position => position.value)
    : []

  const institutions = location.state.values.institutions
    ? location.state.values.institutions.map(institution => institution.value)
    : []

  const filterNodes = nodes =>
    console.log(nodes) ||
    nodes.filter(
      node =>
        (institutions.length
          ? institutions.includes(node.institution)
          : true) &&
        (positions.length ? positions.includes(node.position) : true)
    )

  return (
    <Main>
      <IndexGrid>
        <Header text={`hi`} linkPath={'/'} />
        <Directory people={filterNodes(data.filtered.nodes)} />
      </IndexGrid>
    </Main>
  )
}

export default ByFilter
