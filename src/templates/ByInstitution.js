import React from 'react'
import { graphql } from 'gatsby'

import Main from '../components/Main'
import Directory from '../components/Directory'
import IndexGrid from '../components/IndexGrid'
import Header from '../components/Header'

export const query = graphql`
  query($name: String) {
    allSheetsDirectory(
      filter: { institution: { eq: $name } }
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

const ByInstitution = ({ data, pageContext }) => (
  <Main>
    <IndexGrid>
      <Header text={`${pageContext.name}`} linkPath={'/'} />
      <Directory people={data.allGoogleSheetPeopleRow.nodes} />
    </IndexGrid>
  </Main>
)

export default ByInstitution
