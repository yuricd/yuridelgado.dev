import React from 'react'
import profilePic from '../../assets/images/profile-pic.jpg'
import { GlobalIcon, LinkedinIcon, TelegramIcon } from '../icon/icon'
import styles from './authorCard.module.scss'

const AuthorCard = () => {
  return (
    <div className={styles.authorCard}>
      <div className={styles.image}>
        <img src={profilePic} alt="Author's" />
      </div>

      <div className={styles.summary}>
        <h3 className={styles.name}>Yuri Delgado</h3>
        <ul className={styles.socialList}>
          <li>
            <a
              href="https://www.linkedin.com/in/yuri-catarino-delgado/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <LinkedinIcon width={15} />
            </a>
          </li>
          <li>
            <a
              href="https://t.me/YuriDel"
              target="_blank"
              rel="noopener noreferrer"
              title="Telegram"
            >
              <TelegramIcon width={15} />
            </a>
          </li>
          <li>
            <a
              href="https://yuridelgado.dev"
              target="_blank"
              rel="noopener noreferrer"
              title="Website"
            >
              <GlobalIcon width={15} />
            </a>
          </li>
        </ul>
        <p>
          I'm a Brazilian full-stack engineer who loves learning new
          technologies and trying out new tools.
        </p>
      </div>
    </div>
  )
}

export default AuthorCard
