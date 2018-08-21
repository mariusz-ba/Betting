import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@components/button/button';
import styles from './option.scss';

export default class Option extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  onDelete = e => {
    e.preventDefault();
    this.props.onDelete(this.props.index);
  }

  render() {
    const { index, value, onChange, onDelete } = this.props;

    return (
      <div className={styles.option}>
        <input placeholder="Option name" type="text" name={`option-${index}`} value={value} onChange={onChange}/>
        <Button danger onClick={this.onDelete}>Delete</Button>
      </div>
    )
  }
}