import React from 'react'
import { useState } from 'react'

import { Link } from 'gatsby'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { navigate } from "@reach/router"  

import styles from './menu.module.scss'
import { sleep } from '../../utils/time'

import gsap from 'gsap'

const Menu = () => {
  const [openedMenu, setOpenedMenu] = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  return (
    <nav className={`${styles.menu} ${openedMenu ? styles.opened : ''}`}>
      <div className={styles.icon}>
        <i
          aria-label="Toggle menu"
          role="button"
          onKeyUp={handleClick}
          onClick={handleClick}
          className={`fas ${openedMenu ? 'fa-times' : 'fa-bars'}`}
          tabIndex={0}
        />
      </div>

      <ul>
        <li>
          <AnchorLink
            {...getActiveClass('home')}
            to="/#home"
            onAnchorLinkClick={() => handleClick('home')}
          >
            Home
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            {...getActiveClass('projects')}
            to="/#projects"
            onAnchorLinkClick={() => handleClick('projects')}
          >
            Projects
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            {...getActiveClass('about')}
            to="/#about"
            onAnchorLinkClick={() => handleClick('about')}
          >
            A little about me
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            {...getActiveClass('contact')}
            to="/#contact"
            onAnchorLinkClick={() => handleClick('contact')}
          >
            Let's talk
          </AnchorLink>
        </li>
        <li>
          <Link to="/blog" onClick={handleBlogClick}>Blog</Link>
        </li>
      </ul>
    </nav>
  )

  async function handleBlogClick(e) {
    const TIME = 300
    e.preventDefault()
    gsap.to('#personal', { x: '-200px', opacity: 0, duration: TIME/1000 })
    await sleep(TIME);
    navigate('/blog');
  }

  function handleClick(link) {
    setOpenedMenu(!openedMenu)
    setActiveLink(link)
  }

  function getActiveClass(current) {
    return current === activeLink ? { className: styles.active } : ''
  }
}

export default Menu
