import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './button.scss';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    primary: PropTypes.bool,
    danger: PropTypes.bool
  }
  
  render() {
    const classNames = classnames(styles.button, {
      [styles['button--primary']]: this.props.primary,
      [styles['button--danger']]: this.props.danger
    })

    return (
      <button className={classNames} onClick={this.props.onClick}>{this.props.children}</button>
    )
  }
}