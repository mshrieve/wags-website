import React from 'react'
import { graphql } from 'gatsby'

import Main from '../components/Main'
import IndexGrid from '../components/IndexGrid'
import Directory from '../components/Directory'
import Header from '../components/Header'
export const query = graphql`
  {
    allSheetsPeople(sort: { fields: lastName }) {
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

const All = ({ data }) => (
  <Main>
    <IndexGrid>
      <Header text={`All`} linkPath={'/'} />
      <Directory people={data.allSheetsPeople.nodes} />
    </IndexGrid>
  </Main>
)

export default All
