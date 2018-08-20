import React from 'react';
import PropTypes from 'prop-types';
import styles from './navbar.scss';

export default function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <button className={styles.toggler} onClick={props.onMenuToggle}>
        <i className="fas fa-bars"></i>
      </button>
    </div>
  )
}

Navbar.propTypes = {
  onMenuToggle: PropTypes.func.isRequired
}