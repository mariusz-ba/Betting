import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as EventsActions } from '@services/events';
import { actions as BetsActions } from '@services/bets';
import { eventsSelector } from './selectors';
import styles from './events.scss';

import Event from '@components/event/event';
import BetModal from './components/bet-modal/bet-modal';

const INITIAL_STATE = {
  event: '',
  option: null,
  modal: false
}

export class Events extends Component {
  state = INITIAL_STATE;
  
  async componentDidMount() {
    await this.props.clearEvents();
    await this.props.clearBets();
    await this.props.fetchEvents();
    // Fetch users bets for given events to be able to display
    // if user has placed bet on this event
    this.props.fetchBets({ events: this.props.events.map(event => event.id) });
  }
  
  modalDismiss = () => {
    this.setState(INITIAL_STATE);
  }

  modalAccept = (object) => {
    this.setState(INITIAL_STATE);
    this.props.createBet(object);
    // If bet wasnt successfully created display modal error
  }
  
  onClickOption = (event, option) => {
    this.setState({ event, option, modal: true });
  }

  render() {
    const { events } = this.props;

    return (
      <div>
        <h1>Events</h1>
        <ul className={styles.events}>
          { events &&
            events.map(event => (
              <li key={event.id}>
                <Event
                  id={event.id}
                  name={event.name}
                  organiser={event.organiser}
                  date={event.createdAt}
                  finished={event.result.finished}
                  options={event.options}
                  onClick={this.onClickOption}
                  userPick={event.userPick} />
              </li>
            ))
          }
        </ul>
        { this.state.modal &&
          <BetModal
            event={this.state.event}
            option={this.state.option}
            onAccept={this.modalAccept}
            onDismiss={this.modalDismiss}/>
        }
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
    fetchBets: BetsActions.fetchBets,
    createBet: BetsActions.createBet
  }
)(Events);