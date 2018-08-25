import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as EventsActions } from '@services/events';
import { eventsSelector, userSelector } from './manage.selectors';
import { Link } from 'react-router-dom';
import styles from './manage.scss';

import Event from '@components/event/event';

export class Manage extends Component {
  async componentDidMount() {
    this.props.clearEvents();
    this.props.fetchEvents({ organiser: this.props.user });
  }

  finish = (event, option) => {
    this.props.closeEvent(event, option);
  }

  render() {
    const { events } = this.props;

    return (
      <div>
        <h1>My Events <Link to="/manage/new">New Event</Link></h1>
        <div>
          <ul className={styles.events}>
            { events &&
              events.map(event => (
                <li key={event.id}>
                  {/* <p>{event.name}</p>
                  <p>{event.options[0].name}: x{event.options[0].multiplier} Total: {event.options[0].pool} Odds: {event.options[0].odds}%</p>
                  <p>{event.options[1].name}: x{event.options[1].multiplier} Total: {event.options[1].pool} Odds: {event.options[1].odds}%</p>
                  { event.result.finished === true &&
                    <p>Closed</p>
                  }
                  { event.result.finished === false &&
                    <div>
                      <p>Winner</p>
                      <button onClick={() => this.finish(event.id, event.options[0].id)}>First</button>
                      <button onClick={() => this.finish(event.id, event.options[1].id)}>Second</button>
                    </div>
                  } */}
                  <Event
                    id={event.id}
                    name={event.name}
                    date={event.createdAt}
                    finished={event.result.finished}
                    winner={event.result.option}
                    options={event.options} />
                </li>
              )) 
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: userSelector(state),
    events: eventsSelector(state)
  }
}

export default connect(
  mapStateToProps,
  {
    clearEvents: EventsActions.clearEvents,
    fetchEvents: EventsActions.fetchEvents,
    closeEvent: EventsActions.closeEvent
  }
)(Manage);