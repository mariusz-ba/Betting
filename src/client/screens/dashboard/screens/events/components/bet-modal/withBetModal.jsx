import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as EventsActions } from '@services/events';
import { actions as BetsActions } from '@services/bets';
import { actions as UsersActions } from '@services/users';
import { createSelector } from 'reselect';
import BetModal from './bet-modal';

const INITIAL_STATE = {
  event: '',
  option: null,
  modal: false
}

export default (WrappedComponent) => {
  class WithBetModal extends Component {
    state = INITIAL_STATE;

    static propTypes = {
      createBet: PropTypes.func.isRequired,
      fetchEvent: PropTypes.func.isRequired,
      updateWallet: PropTypes.func.isRequired,
    }

    modalDismiss = () => {
      this.setState(INITIAL_STATE);
    }

    modalAccept = async (object) => {
      this.setState(INITIAL_STATE);
      await this.props.createBet(object);
      this.props.fetchEvent(object.event);
      this.props.updateWallet(this.props.user);
      // If bet wasnt successfully created display modal error
    }

    showModal = (event, option) => {
      this.setState({ event, option, modal: true })
    }

    render() {
      return (
        <React.Fragment>
          <WrappedComponent showModal={this.showModal} {...this.props} />
          { this.state.modal &&
            <BetModal
              event={this.state.event}
              option={this.state.option}
              onAccept={this.modalAccept}
              onDismiss={this.modalDismiss}/>
          }
        </React.Fragment>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      user: userSelector(state)
    }
  }

  return connect(
    mapStateToProps,
    {
      createBet: BetsActions.createBet,
      fetchEvent: EventsActions.fetchEvent,
      updateWallet: UsersActions.updateWallet
    }
  )(WithBetModal)
}

export const userSelector = createSelector(
  state => state.session,
  session => session.user._id
)