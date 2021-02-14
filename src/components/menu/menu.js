import React from 'react';
import { useState } from 'react';

import { AnchorLink } from "gatsby-plugin-anchor-links";

import styles from './menu.module.scss';

const Menu = () => {

  const [openedMenu, setOpenedMenu] = useState(false);

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
            to="/#home"
            onAnchorLinkClick={handleClick}
          >Home</AnchorLink>
        </li>
        <li>
          <AnchorLink
            to="/#projects"
            onAnchorLinkClick={handleClick}
          >Projects</AnchorLink>
        </li>
        <li>
          <AnchorLink
            to="/#about"
            onAnchorLinkClick={handleClick}
          >A little about me</AnchorLink>
        </li>
        <li>
          <AnchorLink
            to="/#contact"
            onAnchorLinkClick={handleClick}
          >Let's talk</AnchorLink>
        </li>
      </ul>
    </nav>
  );

  function handleClick() {
    setOpenedMenu(!openedMenu);
  }
}

export default Menu;
