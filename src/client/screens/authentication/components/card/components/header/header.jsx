import React from 'react';
import styles from './header.scss';

export default function Header(props) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{props.children}</h1>
    </div>
  )
}