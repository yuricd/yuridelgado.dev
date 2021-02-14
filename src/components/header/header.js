import React from 'react';

import logo from '../../assets/images/logo-black.svg';

import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.topBarWrapper}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <img src={logo} alt="Yuri Delgado" />
        </div>

        <div className={styles.switch}>
        </div>
      </div>
    </header>
  )
};

export default Header;