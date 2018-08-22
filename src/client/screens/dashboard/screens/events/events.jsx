import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '@services/events';
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
  
  componentDidMount() {
    this.props.fetchEvents();
  }
  
  modalDismiss = () => {
    this.setState(INITIAL_STATE);
  }

  modalAccept = (object) => {
    console.log('Accepted modal: ', object);
    this.setState(INITIAL_STATE);
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
                  onClick={this.onClickOption} />
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
    fetchEvents: actions.fetchEvents 
  }
)(Events);