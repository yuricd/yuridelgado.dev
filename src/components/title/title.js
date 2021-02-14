import React from 'react';

import styles from './title.module.scss';

const Title = ({ children }) => {
  return (
    <div className={styles.titleWrapper}>
      <h1 className={styles.title}>
        <span>{children}</span>
      </h1>
    </div>
  );
};

export default Title;