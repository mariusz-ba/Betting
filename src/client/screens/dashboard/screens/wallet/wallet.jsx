import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as UsersActions } from '@services/users';
import { userSelector, walletSelector, userIdSelector } from './selectors';
import styles from './wallet.scss';

export class Wallet extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.id)
  }

  render() {
    const { amount, user } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.wallet}>
          <div className={styles.wallet__header}>
            <h3 className={styles.heading}>Welcome to your wallet</h3>
            <h4 className={styles.subheading}>You currently have</h4>
          </div>
          <div className={styles.wallet__amount}>$ {amount}</div>
          <div className={styles.wallet__withdraw}>Withdraw</div>
          <div className={styles.wallet__refill}>Refill</div>
        </div>
        <p className={styles.info}>
          <strong>Info</strong>
          Withdrawing and refilling your wallet is not supported yet. Currently this site is using its internal currency.
        </p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    id: userIdSelector(state),
    user: userSelector(state),
    amount: walletSelector(state)
  }
}

export default connect(
  mapStateToProps,
  {
    fetchUser: UsersActions.fetchUser
  }
)(Wallet);