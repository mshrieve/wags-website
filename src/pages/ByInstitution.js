import React from 'react'
import { graphql } from 'gatsby'

import Directory from '../components/Directory'
export const query = graphql`
  query($name: String) {
    allGoogleSheetPeopleRow(filter: { institution: { eq: $name } }) {
      nodes {
        id
        firstname
        lastname
        position
        institution
      }
    }
  }
`

const ByInstitution = ({ data }) => (
  <Directory people={data.allGoogleSheetPeopleRow.nodes} />
)

export default ByInstitution
