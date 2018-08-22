import React from 'react';
import classnames from 'classnames';
import styles from './content.scss';

const Content = ({ children, className }) => (
  <div className={classnames(styles.content, className)}>
    { children }
  </div>
)

export default Content;