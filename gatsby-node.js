/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
const ByPosition = path.resolve('./src/pages/ByPosition.js')
const ByInstitution = path.resolve('./src/pages/ByInstitution.js')

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for position nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allGoogleSheetPositionsRow {
          nodes {
            type
          }
        }
        allGoogleSheetInstitutionsRow {
          nodes {
            name
          }
        }
      }
    `
  )
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create pages for each markdown file.

  result.data.allGoogleSheetPositionsRow.nodes.forEach(({ type }) => {
    createPage({
      path: type,
      component: ByPosition,
      // In your blog post template's graphql query, you can use path
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        type,
      },
    })
  })

  result.data.allGoogleSheetInstitutionsRow.nodes.forEach(({ name }) => {
    createPage({
      path: name,
      component: ByInstitution,
      // In your blog post template's graphql query, you can use path
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        name,
      },
    })
  })
}
