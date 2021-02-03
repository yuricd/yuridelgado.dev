import React, { useEffect, useState } from 'react'
import Header from '../header/header';

import styles from './home.module.scss'

export default function Home() {

  const [showSecondHeader, setShowSecondHeader] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => {
      window.removeEventListener('scroll', listenToScroll)
    }
  }, [])

  const pageHeight = window.innerHeight

  const subjects = ['clean code', 'open-source', 'software design', 'tdd', 'ux']

  return (
    <div className={styles.home}>
      <div className={styles.wrapper}>
        <Header />

        <main>
          <h1>
            I’m a full-stack dev focused on
            <br />
            code quality and great <br />
            user experiences.
          </h1>

          <ul className={styles.subjects}>
            {subjects.map((s) => <li>{s}</li>)}
          </ul>
        </main>
      </div>
      <div className={styles.bottomLine} />
      
      {showSecondHeader && (
        <div className={styles.secondHeader}>
          <Header inverted={true} />
        </div>
      )}

    </div>
  )

  function listenToScroll() {
    if (window.pageYOffset > pageHeight) {
      setShowSecondHeader(true)
    } else {
      setShowSecondHeader(false)
    }
  } 
}
