import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './input.scss';

export default class Input extends Component {
  state = {
    value: this.props.value
  }

  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    placeholder: '',
    type: 'text',
  }

  onChange = e => {
    this.setState({ value: e.target.value }, () => {
      this.props.onChange(this.state.value);
    })
  }

  render() {
    const { type, placeholder } = this.props;

    return (
      <input 
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={this.state.value} 
        onChange={this.onChange} />
    )
  }
}