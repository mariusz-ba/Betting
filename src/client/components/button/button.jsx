import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './button.scss';

export default class Button extends Component {
  render() {
    const classNames = classnames(styles.button, {
      [styles['button--primary']]: this.props.primary,
      [styles['button--danger']]: this.props.danger
    })

    return (
      <button className={classNames} {...this.props}>{this.props.children}</button>
    )
  }
}