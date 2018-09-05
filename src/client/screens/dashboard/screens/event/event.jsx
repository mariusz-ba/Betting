import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as BetActions } from '@services/bets';
import { actions as EventActions } from '@services/events';
import { makeGetEvent } from './event.selectors';
import styles from './event.scss';

import Event from '@components/event/event';
import { withBetModal } from '@components/bet-modal';

export class EventPage extends Component {
  componentDidMount() {
    this.fetchEvent();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id)
      this.fetchEvent();
  }
  
  fetchEvent = async () => {
    const eventId = this.props.match.params.id;
    await this.props.fetchEvent(eventId);
    this.props.fetchBets({ events: [eventId] })
  }

  render() {
    const { event } = this.props;

    return (
      <div className={styles.container}>
        { this.props.event &&
          <Event
            id={event.id}
            name={event.name}
            date={event.createdAt}
            finished={event.result.finished}
            winner={event.result.option}
            options={event.options}
            onClick={this.props.showModal}
            userPick={event.userPick} />
        }
      </div>
    )
  }
}

function mapStateToProps() {
  const eventSelector = makeGetEvent();
  return (state, ownProps) => {
    return {
      event: eventSelector(state, ownProps)
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    fetchEvent: EventActions.fetchEvent,
    fetchBets: BetActions.fetchBets
  }
)(withBetModal(EventPage)));