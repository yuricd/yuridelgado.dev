import React from 'react'
import Title from '../title/title'
import styles from './about.module.scss'

const About = () => {
  return (
    <div className={styles.about}>
      <Title>A little about me</Title>

      <section>
        <h3>Intro</h3>
        <h4>I'm a twenty-six-year-old developer from São Paulo.</h4>
        <p>
          I have a special feeling for startups and I really enjoy the
          challenging environments they provide. The constant changes in
          demands, the sense of accountability and ownership are amazing and
          make us feel part of something bigger. If you have never had that kind
          of experience, it can be your thing.
        </p>
      </section>

      <section>
        <h3>What I do</h3>
        <h4>
          From idea conception to server's processing, I appreciate the whole
          path.
        </h4>
        <p>
          I enjoy programming since my 16 years old. Due to the necessity of
          creating complete solutions from front to back-end I also developed a
          keen eye to design. I like to think about the user experience and not
          only how server will process something or the browser will handle
          events in the most performatic way.
        </p>
      </section>
    </div>
  )
}

export default About
