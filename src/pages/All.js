import React from 'react'
import { graphql } from 'gatsby'

import Main from '../components/Main'
import IndexGrid from '../components/IndexGrid'
import Directory from '../components/Directory'
import Header from '../components/Header'
export const query = graphql`
  {
    allGoogleSheetPeopleRow(sort: { fields: lastname }) {
      nodes {
        id
        firstname
        lastname
        position
        institution
        website
      }
    }
  }
`

const All = ({ data }) => (
  <Main>
    <IndexGrid>
      <Header text={`All`} linkPath={'/'} />
      <Directory people={data.allGoogleSheetPeopleRow.nodes} />
    </IndexGrid>
  </Main>
)

export default All
