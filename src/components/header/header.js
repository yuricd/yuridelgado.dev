import { Link } from 'gatsby';
import React from 'react';

import logo from '../../assets/images/logo-black.svg';

import styles from './header.module.scss';

const Header = ({ fillBg = false }) => {
  return (
    <header className={styles.topBarWrapper}>
      <div className={[styles.topBar, fillBg ? styles.fillBg : ''].join(' ')}>
        <Link to={generateHomeLink()}>
          <div className={styles.logo}>
            <img src={logo} alt="Yuri Delgado" />
          </div>
        </Link>

        <div className={styles.switch}>
        </div>
      </div>
    </header>
  )

  function generateHomeLink() {
    const isBrowser = typeof window !== 'undefined'
    const uri = isBrowser && window.location.pathname
    return uri && uri.includes('blog') 
      ? '/blog'
      : '/' 
  }
};

export default Header;