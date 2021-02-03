import { Link } from 'gatsby'
import React from 'react'
import logoWhite from '../../assets/images/logo-white.svg'

import styles from './header.module.scss'

export default function Header({ inverted = false }) {
  console.log({ inverted })
  return (
    <header className={[styles.header, inverted ? styles.inverted : ''].join(' ')}>
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
  )
}
