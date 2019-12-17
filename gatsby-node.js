const path = require('path')
const ByPosition = path.resolve('./src/templates/ByPosition.js')
const ByInstitution = path.resolve('./src/templates/ByInstitution.js')
const edit = path.resolve('./src/templates/edit.js')

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions

//   // page.matchPath is a special key that's used for matching pages
//   // only on the client.
//   if (page.path.match(/^\/edit/)) {
//     page.matchPath = '/edit/*'

//     // Update the page.
//     createPage(page)
//   }
// }

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // create the following pages
  // byInstitution
  // byPosition
  // byProfile
  // editProfile

  const result = await graphql(
    `
      {
        institutions: allSheetsDirectory {
          distinct(field: institution)
        }
        positions: allSheetsDirectory {
          distinct(field: position)
        }
        people: allSheetsDirectory {
          nodes {
            firstName
            lastName
            userId
            email
            website
          }
        }
      }
    `
  )
  // // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create pages for each markdown file.

  // result.data.positions.distinct.forEach(type => {
  //   createPage({
  //     path: type,
  //     component: ByPosition,
  //     // In your blog post template's graphql query, you can use path
  //     // as a GraphQL variable to query for data from the markdown file.
  //     context: {
  //       type,
  //     },
  //   })
  // })

  // result.data.institutions.distinct.forEach(name => {
  //   createPage({
  //     path: name,
  //     component: ByInstitution,
  //     // In your blog post template's graphql query, you can use path
  //     // as a GraphQL variable to query for data from the markdown file.
  //     context: {
  //       name,
  //     },
  //   })
  // })
}
