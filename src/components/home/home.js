import React from 'react';

import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>I’m a full-stack dev focused on <br />
        code quality and great <br />
        user experiences. <br /><br />

        Currently building awesome <br /> 
        things at <a href="http://livehere.com.br" target="_blank" rel="noopener noreferrer">LiveHere</a> and <a href="http://izymob.com.br" target="_blank" rel="noopener noreferrer">IzyMob</a>.</h1>
    </div>
  )
};

export default Home;