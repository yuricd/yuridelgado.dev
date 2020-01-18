import React from 'react';
import { useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import styles from './Menu.module.scss';

const Menu: React.FC = () => {

  const [openedMenu, setOpenedMenu] = useState<boolean>(false);

  return (
    <nav className={`${styles.menu} ${openedMenu ? styles.opened : ''}`}>
      <div className={styles.icon}>
        <i 
          onClick={() => setOpenedMenu(!openedMenu)} 
          className={`fas ${openedMenu ? 'fa-times' : 'fa-bars'}`}
        />
      </div>

      <ul>
        <li>
          <NavLink
            exact
            to="/#home"
            smooth={true}
            onClick={handleClick}
          >Home</NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/#projects"
            smooth={true}
            onClick={handleClick}
          >Projects</NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/#about"
            smooth={true}
            onClick={handleClick}
          >A little about me</NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/#contact"
            smooth={true}
            onClick={handleClick}
          >Let's talk</NavLink>
        </li>
      </ul>
    </nav>
  );

  function handleClick() {
    setOpenedMenu(!openedMenu);
  }
}

export default Menu;
