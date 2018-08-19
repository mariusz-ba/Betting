import React, { Component } from 'react';
import styles from './card.scss';

import Header from './components/header/header';
import Content from './components/content/content';

export default class Card extends Component {
  static Header = Header;
  static Content = Content;

  render() {
    return (
      <div className={styles.card} {...this.props}>
        {this.props.children}
      </div>
    )
  }
}