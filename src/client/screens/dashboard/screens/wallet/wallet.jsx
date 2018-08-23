import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as UsersActions } from '@services/users';
import { userSelector, walletSelector, userIdSelector } from './selectors';

export class Wallet extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.id)
  }

  render() {
    const { amount, user } = this.props;

    return (
      <div>
        <h1>Wallet</h1>
        <h3>Hi {user && user.username}, you currently have: {amount} coins.</h3>
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