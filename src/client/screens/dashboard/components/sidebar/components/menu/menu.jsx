import React, { Component } from 'react'
import styles from './menu.scss';

import Item from './menu-item';

export default class Menu extends Component {
  static Item = Item;

  render() {
    return (
      <ul className={styles.menu}>
        {this.props.children}
      </ul>
    )
  }
}