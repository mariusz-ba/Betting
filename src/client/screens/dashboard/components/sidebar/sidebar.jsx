import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './sidebar.scss';

import Menu from './components/menu/menu';

export default class Sidebar extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired
  }

  static defaultProps = {
    open: false
  }

  render() {
    const classNames = classnames(styles.sidebar, {
      [styles['sidebar--open']]: this.props.open
    })

    return (
      <div className={classNames}>
        <Menu>
          <Menu.Item 
            to="/"
            icon="far fa-calendar-alt" 
            text="Events" />
        </Menu>
      </div>
    )
  }
}