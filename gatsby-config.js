require('dotenv').config({
  path: `.env`,
})

const googleSheetsCredentials = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY,
}

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-google-spreadsheet',
      options: {
        // The `spreadsheetId` is required, it is found in the url of your document:
        // https://docs.google.com/spreadsheets/d/<spreadsheetId>/edit#gid=0
        spreadsheetId: '16UZIcmSEH7Vuv9OcX5Qp8gMSqkf8Ffio_PYTEnDmUPU',
        // spreadsheetName: 'People',
        typePrefix: 'Sheets',
        credentials: googleSheetsCredentials,
        // By implementing a `filterNode(node): boolean` function, you can choose to eliminate some nodes before
        // they're added to Gatsby, the default behaviour is to include all nodes:
        filterNode: node => Boolean(node),

        // By implementing a `mapNode(node): node` function, you can provide your own node transformations directly
        // during node sourcing, the default implementation is to return the node as is:
        mapNode: node => node,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
