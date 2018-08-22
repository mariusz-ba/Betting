import React from 'react';
import classnames from 'classnames';
import styles from './header.scss';

const Header = ({ children, className }) => (
  <div className={classnames(styles.header, className)}>
    { children }
  </div>
)

export default Header;