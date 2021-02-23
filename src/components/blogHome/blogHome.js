import React from 'react'
import Header from '../header/header'
import '../../styles/default.scss'
import styles from './blogHome.module.scss'
import { Link } from 'gatsby'
import { calculateReadingTime } from '../../utils/time'
import { format as formatDate } from 'date-fns'


const BlogHome = ({ posts }) => {

  console.log(posts);
  return (
    <div className={styles.blogHome}>
      <Header />

      <div className={styles.wrapper}>
        <header>
          <h1 className={styles.title}>Hello! It's me, Yuri</h1>
          <h2 className={styles.subTitle}>
            I like to write about development, technology, life and thoughts.
            <br />
            You can know more about me <Link to="/">here</Link>.
          </h2>
        </header>

        <div className={styles.list}>
          {posts.map((post, idx) => (
            <article className={styles.card} key={idx}>
              <Link to={`/blog${post.fields.slug}`}>
                <div className={styles.content}>
                  {/* <span className={styles.category}>
                    {post.frontmatter.category}
                  </span> */}
                  <h3>{post.frontmatter.title}</h3>
                  <p>{post.excerpt}</p>

                  <footer>
                    <span className={styles.date}>{formatDate(new Date(post.frontmatter.date), 'MMMM dd yyyy')}</span>
                    <span className={styles.readTime}>
                      {calculateReadingTime(post.wordCount.words)} min read
                    </span>
                  </footer>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogHome
