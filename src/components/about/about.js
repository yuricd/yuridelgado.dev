import React from 'react'
import styles from './about.module.scss'

export default function About() {
  return (
    <div className={styles.about}>
      <header>
        <h1 className={styles.title}>About Me</h1>
      </header>

      <div className={styles.col8}>
        <div className={styles.block}>
          <h2>Intro</h2>
          <h3>I’m a twenty three year-old developer from São Paulo currently leading a tech team at LiveHere.</h3>
          <p>I have a special feeling for startups and I really enjoy the challenging environments they provide. The constant changes in demands, the sense of accountability and ownership are amazing and make us feel part of something bigger. If you have never had that kind of experience, it can be your thing (BTW, LiveHere is hiring and you can check the open positions here).</p>
        </div>

        <div className={styles.block}>
          <h2>What I do</h2>
          <h3>From idea conception to server’s processment, I appreciate the whole path.</h3>
          <p>I enjoy programming since my 16’s. Due to the necessity of creating complete solutions from front to back-end I also developed a keen eye to design. I like to thing about the user experience and not only how server will process something or the browser will handle events in the most performatic way.</p>
          <p>It’s common to our team to receive a demand and work on the whole solution. Mapping the user story, plan the UI, model the database, specify clients, endpoints and finally get our hands dirty in the actual code.</p>
        </div>
      </div>
    </div>
  )
}
