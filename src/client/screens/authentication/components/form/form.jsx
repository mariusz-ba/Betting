import React, { Component } from 'react';
import Group from './components/group/group';
import styles from './form.scss';

export default class Form extends Component {
  static Group = Group;

  render() {
    return (
      <form className={styles.form} {...this.props}>
        {this.props.children}
      </form>
    )
  }
}