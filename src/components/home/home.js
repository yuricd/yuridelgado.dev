import { Link } from 'gatsby'
import React from 'react'
import logoWhite from '../../assets/images/logo-white.svg'

import styles from './home.module.scss'

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.wrapper}>
        <header>
          <div className={styles.logo}>
            <img src={logoWhite} alt="YD" />
          </div>
          <nav className={styles.menu}>
            <ul>
              <li>
                <Link>Home</Link>
              </li>
              <li>
                <Link>About Me</Link>
              </li>
              <li>
                <Link>Projects</Link>
              </li>
              <li>
                <Link>Contact</Link>
              </li>
              <li>
                <Link>Blog</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <h1>
            I’m a full-stack dev focused on
            <br />
            code quality and great <br />
            user experiences.
          </h1>

        </main>
      </div>
      <div className={styles.bottomLine} />
    </div>
  )
}
