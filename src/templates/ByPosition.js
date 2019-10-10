import React from 'react'
import { graphql } from 'gatsby'

import Main from '../components/Main'
import IndexGrid from '../components/IndexGrid'
import Directory from '../components/Directory'
import Header from '../components/Header'

export const query = graphql`
  query($type: String) {
    allSheetsPeople(
      filter: { position: { eq: $type } }
      sort: { fields: lastName }
    ) {
      nodes {
        id
        firstName
        lastName
        position
        institution
        website
      }
    }
  }
`

const ByPosition = ({ data, pageContext }) => (
  <Main>
    <IndexGrid>
      <Header text={`${pageContext.type}s`} linkPath={'/'} />
      <Directory people={data.allGoogleSheetPeopleRow.nodes} />
    </IndexGrid>
  </Main>
)

export default ByPosition
