import React from 'react';
import styles from './Title.module.scss';

interface TitleProps {
  children: React.ReactNode,
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className={styles.titleWrapper}>
      <h1 className={styles.title}>
        <span>{children}</span>
      </h1>
    </div>
  );
};

export default Title;