import React, { Component } from 'react';
import { connect } from 'react-redux';
import { betsSelector, userSelector } from './bets.selectors';
import { actions as BetsActions } from '@services/bets';
import { actions as EventsActions } from '@services/events';
import styles from './bets.scss';

export class Bets extends Component {
  async componentDidMount() {
    this.props.clearBets();
    this.props.clearEvents();
    await this.props.fetchBets(this.props.user);
    this.props.fetchEvents({ events: this.props.bets.map(bet => bet.event) })
  }

  render() {
    const { bets } = this.props;

    return (
      <div>
        <h1 className={styles.heading}>My bets</h1>
        <div className={styles.bets}>
          <table className={styles.bets__table}>
            <thead className={styles.bets__thead}>
              <tr>
                <th>Nr.</th>
                <th>Event</th>
                <th>Pick</th>
                <th>Amount</th>
                <th>Potential reward</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className={styles.bets__tbody}>
              { bets &&
                bets.map((bet, index) => (
                  <tr key={bet.id}>
                    <td>{index + 1}</td>
                    <td>{bet.options[0]} vs {bet.options[1]}</td>
                    <td><strong>{bet.pick}</strong></td>
                    <td>{bet.amount} coins</td>
                    <td>-</td>
                    <td>{bet.resolved.resolved ? 'Resolved' : 'Pending'}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: userSelector(state),
    bets: betsSelector(state)
  }
}

export default connect(
  mapStateToProps,
  {
    clearEvents: EventsActions.clearEvents,
    fetchEvents: EventsActions.fetchEvents,
    clearBets: BetsActions.clearBets,
    fetchBets: BetsActions.fetchBets
  }
)(Bets);