import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './event.scss';

export default class Event extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    // Events name to be displayed on top
    name: PropTypes.string.isRequired,
    // Timestamp
    date: PropTypes.number.isRequired,
    
    finished: PropTypes.bool.isRequired,
    winner: PropTypes.string,
    userPick: PropTypes.string,

    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      pool: PropTypes.number.isRequired
    })),

    // Function executed every time user clicks an option
    onClick: PropTypes.func.isRequired
  }

  optionClicked(index) {
    if(!this.props.finished && !this.props.userPick)
      this.props.onClick(this.props.id, this.props.options[index]);
  }

  render() {
    const { name, date, finished, winner, options, userPick } = this.props;

    const eventClass = classnames(styles.event, {
      [styles['event--finished']]: finished
    });

    const option1Class = classnames(styles.option, {
      [styles['option--pick']]: userPick && userPick === options[0].id,
      [styles['option--winner']]: winner && winner === options[0].id,
    })

    const option2Class = classnames(styles.option, {
      [styles['option--pick']]: userPick && userPick === options[1].id,
      [styles['option--winner']]: winner && winner === options[1].id,
    })

    return (
      <div className={eventClass}>
        <div className={styles.header}>
          <p className={styles.date}>{(new Date(date)).toLocaleString()}</p>
          <h3 className={styles.title}>{name}</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.option1}>
            <div className={option1Class} onClick={() => this.optionClicked(0)}>
                <h3 className={styles.option__name}>{options[0].name}</h3>
                <p className={styles.option__multiplier}>x{options[0].multiplier.toFixed(2)}</p>
              </div>
              <div className={styles.odds}>{options[0].odds}%</div>
            </div>
          <div className={styles.separator}>
            <p>VS</p>
          </div>
          <div className={styles.option2}>
            <div className={styles.odds}>{options[1].odds}%</div>
            <div className={option2Class} onClick={() => this.optionClicked(1)}>
              <h3 className={styles.option__name}>{options[1].name}</h3>
              <p className={styles.option__multiplier}>x{options[1].multiplier.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Create option component and move click click handlers to prevent
// creating functions on every render