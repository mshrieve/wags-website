import React from 'react'
import { graphql } from 'gatsby'

import './position.css'
import Directory from '../components/Directory'

export const query = graphql`
  query($type: String) {
    allGoogleSheetPeopleRow(filter: { position: { eq: $type } }) {
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

const ByPosition = ({ data }) => (
  <Directory people={data.allGoogleSheetPeopleRow.nodes} />
)

export default ByPosition
