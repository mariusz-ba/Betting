import React from 'react';
import classnames from 'classnames';
import styles from './footer.scss';

const Footer = ({ children, className }) => (
  <div className={classnames(styles.footer, className)}>
    { children }
  </div>
)

export default Footer;