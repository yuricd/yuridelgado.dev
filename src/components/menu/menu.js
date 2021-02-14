import React from 'react'
import { useState } from 'react'

import { AnchorLink } from 'gatsby-plugin-anchor-links'

import styles from './menu.module.scss'

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
      </ul>
    </nav>
  )

  function handleClick(link) {
    setOpenedMenu(!openedMenu)
    setActiveLink(link)
  }

  function getActiveClass(current) {
    return current === activeLink ? { className: styles.active } : ''
  }
}

export default Menu
