import React from 'react';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1>I’m a full-stack dev focused on <br />
        code quality and great <br />
        user experiences. <br /><br />

        Currently building awesome <br /> 
        things at <a href="http://livehere.com.br" target="_blank" rel="noopener noreferrer">LiveHere</a>.</h1>
    </div>
  )
};

export default Home;