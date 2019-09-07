import React from 'react'
import { graphql } from 'gatsby'

import './position.css'
import Directory from '../components/Directory'

export const query = graphql`
  {
    allGoogleSheetPeopleRow {
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

const All = ({ data }) => (
  <Directory people={data.allGoogleSheetPeopleRow.nodes} />
)

export default All
