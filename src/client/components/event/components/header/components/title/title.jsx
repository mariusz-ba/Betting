import React from 'react';
import styles from './title.scss';

const Title = ({ children }) => (
  <h3 className={styles.title}>
    { children }
  </h3>
)

export default Title;