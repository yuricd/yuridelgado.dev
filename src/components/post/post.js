import React from 'react'
import { graphql, Link } from 'gatsby'

import styles from './post.module.scss'
import Header from '../header/header'
import { calculateReadingTime } from '../../utils/time'

import { format as formatDate } from 'date-fns'

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import {
  UserIcon,
  LeftArrowIcon,
  CalendarIcon,
  ClockIcon,
} from '../icon/icon'
import rehypeReact from 'rehype-react'

import Img from 'gatsby-image'

deckDeckGoHighlightElement()

export const CodeHighlight = ({
  children,
  language = 'javascript',
  highlightLines = '',
}) => (
  <deckgo-highlight-code language={language} highlight-lines={highlightLines}>
    <code slot="code">{children}</code>
  </deckgo-highlight-code>
)

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 'code-highlight': CodeHighlight },
}).Compiler

const Post = ({ data }) => {
  const post = data.markdownRemark
  const postDate = new Date(post.frontmatter.date)
  const postImage = post.frontmatter.image && post.frontmatter.image.childImageSharp.fluid
  console.log(post)

  return (
    <div className={styles.post}>
      <Header />

      {postImage && (
        <div className={styles.cover}>
          <Img fluid={postImage} />
        </div>
      )}

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

      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.quotes}></div>
          <div>{renderAst(post.htmlAst)}</div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      html
      frontmatter {
        title
        date
        author
        image {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
