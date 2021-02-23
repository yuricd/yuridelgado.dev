import React from 'react'
import { graphql } from 'gatsby'
import BlogHome from '../components/blogHome/blogHome'
import { Helmet } from 'react-helmet'

const Blog = ({ data }) => {
  const { posts } = data.blog

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
      </Helmet>
      <BlogHome posts={posts} />
    </>
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
          date(fromNow: false)
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
