import React from 'react'
import styles from './contact.module.scss'

export default function Contact() {
  return (
    <div className={styles.contact}>
      <header>
        <h1 className={styles.title}>Wanna Know Me Better?</h1>
      </header>

      <div className={styles.col12}>
        <ul>
          <li>
            <a href="">GitHub</a>
          </li>
          <li>
            <a href="">LinkedIn</a>
          </li>
          <li>
            <a href="">Instagram</a>
          </li>
          <li>
            <a href="">Telegram</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
