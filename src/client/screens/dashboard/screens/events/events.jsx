import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '@services/events';
import { eventsSelector } from './selectors';
import styles from './events.scss';

import Event from '@components/event/event';

export class Events extends Component {
  componentDidMount() {
    this.props.fetchEvents();
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
                  name={event.name}
                  organiser={event.organiser}
                  date={event.createdAt}
                  finished={event.result.finished}
                  options={event.options} />
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
    fetchEvents: actions.fetchEvents 
  }
)(Events);