import React from "react"
import { graphql } from "gatsby"

const SingleBlog = props => {
  // get data(from graphql query), pageContext(from gatsby-node.js) from props
  console.log(props.data)
  console.log(props.pageContext)
  return (
    <div>
      <h1>id:{props.pageContext.id}</h1>
      <h1>title:{props.data.content.title}</h1>
    </div>
  )
}

export default SingleBlog

export const query = graphql`
  query($id: String!) {
    content: contentfulBlogPost(id: { eq: $id }) {
      title
    }
  }
`
