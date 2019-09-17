const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const eventPages = await graphql(`
    {
      allContentfulBlog {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)
  const blogTemplate = path.resolve("src/templates/Blog.js")
  eventPages.data.allContentfulBlog.edges.map(edge => {
    // see edge logs in terminal
    console.log(edge)
    createPage({
      path: edge.node.slug,
      component: blogTemplate,
      context: {
        id: edge.node.id,
      },
    })
  })
}
