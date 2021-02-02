import React from 'react'
import styles from './title.module.scss'

export default function Title({ title, lineColor }) {
  return (
    <header>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.row} style={{ backgroundColor: lineColor ?? '#E7E7E7' }} />
    </header>
  )
}
