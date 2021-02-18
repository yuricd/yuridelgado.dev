import React from 'react'
import { graphql, Link } from 'gatsby'

import styles from './post.module.scss'
import Header from '../header/header'
import { calculateReadingTime } from '../../utils/time'

import { format as formatDate } from 'date-fns'
import bg from '../../blog/images/background-sample.png'

const Post = ({ data }) => {
  const post = data.markdownRemark

  console.log(post)

  const postDate = new Date(post.frontmatter.date)
  console.log(postDate)

  return (
    <div className={styles.post}>

      <Header />
      
      <div className={styles.cover}>
        <img src={bg} />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Link to="/blog">All posts</Link>
        </div>

        <header>
          <h1>{post.frontmatter.title}</h1>

          <div className={styles.meta}>
            <span>{formatDate(new Date(postDate), 'MMMM dd yyyy')}</span>
            <span>{post.frontmatter.author}</span>
            <span>{calculateReadingTime(post.wordCount.words)}min read</span>
          </div>
        </header>
      </div>

      <div>
        <div className={styles.content}>
          <div className={styles.quotes}>quotes</div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        author
      }
      fields {
        slug
      }
      wordCount {
        words
      }
    }
  }
`

export default Post
