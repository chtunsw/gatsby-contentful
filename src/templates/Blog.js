import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const Blog = props => {
  // get data(from graphql query), pageContext(from gatsby-node.js) from props
  console.log(props.data)
  console.log(props.pageContext)
  const id = props.pageContext.id
  const title = props.data.content.title
  const body = props.data.content.body.content
  const banner = props.data.content.banner.fluid
  const bannerAlt = props.data.content.banner.title
  const gallery = props.data.content.gallery
  return (
    <div>
      <h1>id:{id}</h1>
      <h1>title:{title}</h1>
      <h1>body:</h1>
      {body.map((section, index) => {
        if (section.content[0].nodeType === "text") {
          return (
            <h2 key={section.content[0].nodeType + index}>
              {section.content[0].value}
            </h2>
          )
        } else if (section.content[0].nodeType === "text") {
          return (
            <p key={section.content[0].nodeType + index}>
              {section.content[0].value}
            </p>
          )
        }
      })}
      <h1>banner:</h1>
      <Img fluid={banner} alt={bannerAlt} />
      <h1>gallery:</h1>
      {gallery.map((img, index) => (
        <Img key={img.title + index} fluid={img.fluid} alt={img.title} />
      ))}
    </div>
  )
}

export default Blog

export const query = graphql`
  query($id: String!) {
    content: contentfulBlog(id: { eq: $id }) {
      title
      body {
        content {
          content {
            value
            nodeType
          }
        }
      }
      banner {
        title
        fluid {
          base64
          tracedSVG
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      gallery {
        title
        fluid {
          base64
          tracedSVG
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
  }
`
