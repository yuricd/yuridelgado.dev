import { Link } from 'gatsby';
import React from 'react';

import logo from '../../assets/images/logo-black.svg';

import styles from './header.module.scss';

const Header = ({ fillBg = false }) => {
  return (
    <header className={styles.topBarWrapper}>
      <div className={[styles.topBar, fillBg ? styles.fillBg : ''].join(' ')}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="Yuri Delgado" />
          </div>
        </Link>

        <div className={styles.switch}>
        </div>
      </div>
    </header>
  )
};

export default Header;