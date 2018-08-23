import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './event.scss';

export default class Event extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    organiser: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    finished: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      pool: PropTypes.number.isRequired
    })),
    onClick: PropTypes.func.isRequired,
    userPick: PropTypes.string
  }

  optionClicked(index) {
    this.props.onClick(this.props.id, this.props.options[index]);
  }

  render() {
    const { name, organiser, date, finished, options, userPick } = this.props;

    return (
      <div className={styles.event}>
        <div className={styles['event__header']}>
          <span>{name} created by {organiser} on {date}</span>
        </div>
        <div className={styles['event__left']} onClick={() => this.optionClicked(0)}>
          <span>{options[0].name} {userPick && userPick === options[0].id && 'Your choice'}</span>
        </div>
        <div className={styles['event__right']} onClick={() => this.optionClicked(1)}>
          <span>{options[1].name} {userPick && userPick === options[1].id && 'Your choice'}</span>
        </div>
        <div className={styles['event__footer']}>
          <span>Finished: {finished ? 'Yes' : 'No'}</span>
        </div>
      </div>
    )
  }
}

// Create option component and move click click handlers to prevent
// creating functions on every render