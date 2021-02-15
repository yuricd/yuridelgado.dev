import React from 'react';
import { graphql } from "gatsby"


const Blog = ({ data }) => {
  const { posts } = data.blog;

  return (
    <div>
      <h1>Hello! It's me, Yuri</h1>
      <h2>I like to write about development, technology, life and thoughts.<br />
        You can know more about me here.</h2>

      {posts.map(post => 
        <article key={post.id}>
          <h2>{post.frontmatter.title}</h2>
          <small>{post.frontmatter.author}, {post.frontmatter.date}</small>
          <p>{post.excerpt}</p>
        </article>  
      )}
    </div>
  )
};

export const pageQuery = graphql`
  query MyQuery {
    blog: allMarkdownRemark {
      posts: nodes {
        fields {
          slug
        }
        excerpt
        frontmatter {
          author
          date(fromNow: true)
          title
        }
        wordCount {
          words
        }
      }
    }
  }`

export default Blog;