const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const eventPages = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `)
  const singleBlogTemplate = path.resolve("src/templates/SingleBlog.js")
  eventPages.data.allContentfulBlogPost.edges.map(edge => {
    // see edge logs in terminal
    console.log(edge)
    createPage({
      path: edge.node.slug,
      component: singleBlogTemplate,
      context: {
        id: edge.node.id,
      },
    })
  })
}
