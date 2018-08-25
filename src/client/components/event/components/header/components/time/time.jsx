import React from 'react';
import styles from './time.scss';

const Time = ({ children }) => (
  <p className={styles.time}>
    { children }
  </p>
)

export default Time;