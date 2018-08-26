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
        <div className={styles.header}>
          <div className={styles.wrapper}>
            <h1 className={styles.header__title}>My Events</h1>
            <Link to="/manage/new" className={styles.header__button}>Create</Link>
          </div>
        </div>
        <div>
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
                    options={event.options} >
                    { event.result.finished === false &&
                      <Event.Actions>
                        <button onClick={() => this.finish(event.id, event.options[0].id)}>First</button>
                        <button onClick={() => this.finish(event.id, event.options[1].id)}>Second</button>
                      </Event.Actions>  
                    }
                  </Event>
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