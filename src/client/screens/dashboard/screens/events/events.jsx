import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as EventsActions } from '@services/events';
import { actions as BetsActions } from '@services/bets';
import { eventsSelector } from './events.selectors';
import styles from './events.scss';

import Event from '@components/event/event';
import { withBetModal } from '@components/bet-modal';

export class Events extends Component {
  async componentDidMount() {
    await this.props.clearEvents();
    await this.props.clearBets();
    await this.props.fetchEvents();
    // Fetch users bets for given events to be able to display
    // if user has placed bet on this event
    this.props.fetchBets({ events: this.props.events.map(event => event.id) });
  }

  render() {
    const { events } = this.props;

    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Recent events</h1>
        <ul className={styles.events}>
          { events &&
            events.map(event => (
              <li key={event.id}>
                <Event
                  id={event.id}
                  name={event.name}
                  date={event.createdAt}
                  finished={event.result.finished}
                  winner={event.result.option}
                  options={event.options}
                  onClick={this.props.showModal}
                  userPick={event.userPick} />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: eventsSelector(state)
  }
}

export default connect(
  mapStateToProps, 
  { 
    clearEvents: EventsActions.clearEvents,
    clearBets: BetsActions.clearBets,
    fetchEvents: EventsActions.fetchEvents,
    fetchBets: BetsActions.fetchBets
  }
)(withBetModal(Events));