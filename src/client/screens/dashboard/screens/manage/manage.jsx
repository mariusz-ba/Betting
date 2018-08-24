import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as EventsActions } from '@services/events';
import { eventsSelector, userSelector } from './manage.selectors';
import { Link } from 'react-router-dom';
import styles from './manage.scss';

export class Manage extends Component {
  async componentDidMount() {
    this.props.clearEvents();
    this.props.fetchEvents({ organiser: this.props.user });
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
                <li key={event.id}>{event.name}</li>
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
    fetchEvents: EventsActions.fetchEvents
  }
)(Manage);