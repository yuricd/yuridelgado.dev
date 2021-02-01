import React from 'react';
import Title from '../Title/Title';
import styles from './Contact.module.scss';

const Contact: React.FC = () => {
  return (
    <div className={styles.contact}>
      <Title>Wanna know me better?</Title>
      <ul>
        <li>
          <a href="https://github.com/yuricd" target="_blank" rel="noopener noreferrer">GitHub</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/yuri-catarino-delgado/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li>
          <a href="https://instagram.com/yuridelg" target="_blank" rel="noopener noreferrer">Instagram</a>
        </li>
        <li>
          <a href="https://t.me/YuriDel" target="_blank" rel="noopener noreferrer">Telegram</a>
        </li>
      </ul>
        
    </div>
  )
};

export default Contact;