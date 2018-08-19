import React from 'react';
import classnames from 'classnames';
import styles from './group.scss';

export default function Group(props) {
  const classNames = classnames(styles.group, {
    [styles['group--error']]: props.error
  })

  return (
    <div className={classNames} {...props}>
      {props.children}
      { props.error &&
        <p className={styles.group__error}>{props.error}</p>
      }
    </div>
  )
}