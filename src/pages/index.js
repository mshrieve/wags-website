import React from "react"
import { graphql } from "gatsby"

import "./index.css"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query MyQuery {
    allGoogleSheetPeopleRow {
      nodes {
        id
        firstname
        lastname
        institution
        position
      }
    }
  }
`

const PersonItem = ({ firstname, lastname, position, institution }) => (
  <section className="item">
    <span className="name">{[firstname, lastname].join(" ")}</span>
    <span className="position">{position}</span>
    <span className="institution">{institution}</span>
  </section>
)

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <section>
      {data.allGoogleSheetPeopleRow.nodes.map(person => (
        <PersonItem key={person.id} {...person} />
      ))}
    </section>
  </Layout>
)

export default IndexPage
