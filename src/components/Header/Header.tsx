import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg';

interface HeaderProps {
  switchTheme?: () => void,
}

const Header: React.FC<HeaderProps> = ({ switchTheme }: HeaderProps) => {
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