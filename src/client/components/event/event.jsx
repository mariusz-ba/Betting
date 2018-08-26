import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './event.scss';

import Header from './components/header/header';
import Time from './components/header/components/time/time';
import Title from './components/header/components/title/title';
import Actions from './components/header/components/actions/actions';

import Options from './components/options/options';
import Option from './components/options/components/option/option';

export default class Event extends Component {
  static Actions = Actions;

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
    onClick: PropTypes.func
  }

  optionClicked(index) {
    if(!this.props.onClick)
      return;

    if(!this.props.finished && !this.props.userPick)
      this.props.onClick(this.props.id, this.props.options[index]);
  }

  render() {
    const { name, date, finished, winner, options, userPick } = this.props;

    const eventClass = classnames(styles.event, {
      [styles['event--finished']]: finished
    });

    const actions = 
      this.props.children && 
      this.props.children.type &&
      this.props.children.type === Actions ? this.props.children : <Actions></Actions>;

    return (
      <div className={eventClass}>
        <Header>
          <Time>
            {(new Date(date)).toLocaleDateString('pl-PL', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Time>
          <Title>{name}</Title>
          { actions }
        </Header>
        <Options>
          <Option
            left
            disabled={finished || userPick}
            name={options[0].name}
            multiplier={options[0].multiplier}
            odds={options[0].odds}
            pick={userPick && userPick === options[0].id}
            winner={winner && winner === options[0].id}
            onClick={() => this.optionClicked(0)} />
          <Option
            right
            disabled={finished || userPick}
            name={options[1].name}
            multiplier={options[1].multiplier}
            odds={options[1].odds}
            pick={userPick && userPick === options[1].id}
            winner={winner && winner === options[1].id}
            onClick={() => this.optionClicked(1)} />
        </Options>
      </div>
    )
  }
}

// Create option component and move click click handlers to prevent
// creating functions on every render