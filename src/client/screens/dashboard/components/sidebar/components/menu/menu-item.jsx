import React from 'react';
import PropTypes from 'prop-types';
import styles from './menu.scss';
import { Link } from 'react-router-dom';

export default function MenuItem(props) {
  return (
    <li className={styles.item}>
      <Link to={props.to}>
        { props.icon && 
          <i className={props.icon}></i>
        }
        { props.text &&
          <span className={styles['item__text']}>{props.text}</span> 
        }
      </Link>
    </li>
  )
}

MenuItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  to: PropTypes.string.isRequired
}