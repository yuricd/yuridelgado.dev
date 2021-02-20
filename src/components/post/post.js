import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'

import styles from './post.module.scss'
import Header from '../header/header'
import { calculateReadingTime } from '../../utils/time'

import { format as formatDate } from 'date-fns'
import bg from '../../blog/images/background-sample.png'

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import { UserIcon, LeftArrowIcon, CalendarIcon, ClockIcon, QuoteIcon } from '../icon/icon'
import { clearHighlightsMark, getHighlights } from '../../utils/text'

const Post = ({ data }) => {
  useEffect(() => {
    deckDeckGoHighlightElement()
  }, [])

  const post = data.markdownRemark

  const postDate = new Date(post.frontmatter.date)

  return (
    <div className={styles.post}>
      <Header />

      {/* <div className={styles.cover}>
        <img src={bg} />
      </div> */}

      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Link to="/blog">
            <LeftArrowIcon /> All posts
          </Link>
        </div>

        <header>
          <h1>{post.frontmatter.title}</h1>

          <div className={styles.meta}>
            <span>
              <CalendarIcon />
              {formatDate(new Date(postDate), 'MMMM dd yyyy')}
            </span>
            <span>
              <UserIcon />
              {post.frontmatter.author}
            </span>
            <span>
              <ClockIcon />
              {calculateReadingTime(post.wordCount.words)} min read
            </span>
          </div>
        </header>
      </div>

      <div>
        <div className={styles.content}>
          <div className={styles.quotes}>
            {getHighlights(post.html).map((highlight) => 
              <div className={styles.quote}>
                <QuoteIcon /> <span> {highlight}</span>
              </div>
            )}
          </div>
          <div dangerouslySetInnerHTML={{ __html: clearHighlightsMark(post.html) }} />
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
