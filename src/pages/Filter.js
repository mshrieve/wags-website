import React from 'react'
import { graphql } from 'gatsby'

import Main from '~/components/Main'
import Directory from '~/components/Directory'
import IndexGrid from '~/components/IndexGrid'
import Header from '~/components/Header'

export const query = graphql`
  {
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

const ByFilter = ({ data, location }) => {
  console.log(location)
  return (
    <Main>
      <IndexGrid>
        <Header
          text={location.state.filter ? 'results' : 'all'}
          linkPath={'/'}
        />
        <Directory
          people={filterNodes(data.filtered.nodes, location.state.filter)}
        />
      </IndexGrid>
    </Main>
  )
}

export default ByFilter
