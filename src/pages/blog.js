import React from 'react'
import { useEffect } from 'react'
import { graphql } from 'gatsby'
import BlogHome from '../components/blogHome/blogHome'
import { Helmet } from 'react-helmet'
import gsap from 'gsap'
import SEO from '../components/seo'

const Blog = ({ data }) => {

  useEffect(() => {
    gsap.to('#blog', { opacity: 1, duration: .4 })
  }, [])

  const { posts } = data.blog

  return (
    <div id="blog" style={{ opacity: 0 }}>
      <SEO title="Blog" URI="/blog" />
      <Helmet>
        <link rel="canonical" href="http://yuridelgado.dev/blog" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
      </Helmet>
      <BlogHome posts={posts} />
    </div>
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
