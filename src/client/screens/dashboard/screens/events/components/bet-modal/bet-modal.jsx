import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/modal/modal';
import Button from '@components/button/button';
import styles from './bet-modal.scss';

export default class BetModal extends Modal {
  state = {
    amount: ''
  }

  static propTypes = {
    onAccept: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
    event: PropTypes.string.isRequired
  }

  changeAmount = amount => {
    this.setState({ amount: amount });
  }

  onAccept = () => {
    this.props.onAccept({
      event: this.props.event,
      option: this.props.option.id, 
      amount: this.state.amount 
    });
  }

  renderContent() {
    return (
      <React.Fragment>
        <Modal.Header>You picked {this.props.option.name}</Modal.Header>
        <Modal.Content>
          <p className={styles.text}>How much money would You like to bet on {this.props.option.name}?</p>
          <Modal.Input placeholder="Amount" value={this.state.amount} onChange={this.changeAmount}/>
        </Modal.Content>
        <Modal.Footer className={styles.actions}>
          <Button danger onClick={this.props.onDismiss}>Cancel</Button>
          <Button primary onClick={this.onAccept}>Submit</Button>
        </Modal.Footer>
      </React.Fragment>
    )
  }
}