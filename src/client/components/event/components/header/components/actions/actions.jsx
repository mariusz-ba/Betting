import React from 'react';
import styles from './actions.scss';

const Actions = ({ children }) => {
  return (
    <div className={styles.actions}>
      { children }
    </div>
  )
}

export default Actions;