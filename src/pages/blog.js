import React from 'react'
import { graphql } from 'gatsby'
import BlogHome from '../components/blogHome/blogHome'

const Blog = ({ data }) => {
  const { posts } = data.blog

  return (
    <BlogHome posts={posts} />
  )
}

export const pageQuery = graphql`
  query MyQuery {
    blog: allMarkdownRemark {
      posts: nodes {
        fields {
          slug
        }
        excerpt(pruneLength: 80)
        frontmatter {
          author
          date(fromNow: true)
          title
          category
        }
        wordCount {
          words
        }
      }
    }
  }
`

export default Blog
