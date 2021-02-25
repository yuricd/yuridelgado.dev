import React from 'react'
import { useEffect } from 'react'
import { graphql, Link, navigate } from 'gatsby'

import styles from './post.module.scss'
import Header from '../header/header'
import { calculateReadingTime, sleep } from '../../utils/time'

import { format as formatDate } from 'date-fns'

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import { UserIcon, LeftArrowIcon, CalendarIcon, ClockIcon } from '../icon/icon'
import rehypeReact from 'rehype-react'
import gsap from 'gsap'

import Img from 'gatsby-image'
import SEO from '../seo'

deckDeckGoHighlightElement()

export const CodeHighlight = ({
  children,
  language = 'javascript',
  highlightLines = '',
  showLines = 'true',
}) => (
  <deckgo-highlight-code
    language={language}
    highlight-lines={highlightLines}
    line-numbers={!!showLines}
  >
    <code slot="code">{children}</code>
  </deckgo-highlight-code>
)

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 'code-highlight': CodeHighlight },
}).Compiler

const Post = ({ data }) => {
  useEffect(() => {
    gsap.to('#post', { duration: 0.5, opacity: 1 })
  }, [])

  const post = data.markdownRemark
  const postDate = new Date(post.frontmatter.date)
  const postImage =
    post.frontmatter.image && post.frontmatter.image.childImageSharp.fluid
  const postImageCredits = post.frontmatter.credits

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        article={true}
        URI={`/blog${post.fields.slug}`}
        description={post.excerpt}
        image={postImage.src}
      />
      <div className={styles.post} id="post">
        <Header fillBg={true} />

        {postImage && (
          <>
            <div className={styles.cover}>
              <Img fluid={postImage} />
            </div>
            <span
              className={styles.credits}
              dangerouslySetInnerHTML={{ __html: postImageCredits }}
            />
          </>
        )}

        <div className={styles.wrapper}>
          <div className={styles.top}>
            <Link to="/blog" onClick={handleBackClick}>
              <LeftArrowIcon /> All posts
            </Link>
          </div>

          <header>
            <h1>{post.frontmatter.title}</h1>

            <div className={styles.meta}>
              <span>
                <CalendarIcon />
                {formatDate(postDate, 'MMMM dd yyyy')}
              </span>
              <span>
                <UserIcon />
                <Link to="/">{post.frontmatter.author}</Link>
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
    </>
  )

  async function handleBackClick(e) {
    const TIME = 300
    e.preventDefault()
    gsap.to('#post', { x: '50px', opacity: 0, duration: TIME / 1000 })
    await sleep(TIME)
    navigate('/blog')
  }
}

export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      html
      excerpt(pruneLength: 100)
      frontmatter {
        title
        date
        author
        credits
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
