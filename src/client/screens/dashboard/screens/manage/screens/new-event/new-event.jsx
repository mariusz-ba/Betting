import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Option from './components/option/option';
import Button from '@components/button/button';
import styles from './new-event.scss';

import axios from 'axios';

export class NewEvent extends Component {
  state = {
    name: '',
    options: [''],
    errors: null
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleChangeOption = e => {
    const name = e.target.name;
    const value = e.target.value;
    const index = parseInt(name.split('-')[1]);
    this.setState({ options: [
      ...this.state.options.slice(0, index),
      value,
      ...this.state.options.slice(index + 1)
    ]})
  }

  newOption = e => {
    e.preventDefault();
    // Check if last option is not empty
    const { options } = this.state;
    if(options[options.length - 1].length !== 0)
      this.setState({ options: [ ...options, '' ]})
  }

  deleteOption = index => {
    const { options } = this.state;

    if(options.length === 1) {
      this.setState({ options: [''] });
      return;
    }

    this.setState({ options: [
      ...options.slice(0, index),
      ...options.slice(index + 1)
    ]})
  }

  submit = async e => {
    e.preventDefault();
    try {
      const event = {
        name: this.state.name,
        options: this.state.options
      }

      const res = await axios.post('/api/events', event);
      const data = res.data;
      this.props.history.push('/manage');
    } catch(e) {
      this.setState({ errors: e.response.data.fields })
    }
  }

  render() {
    const { name, options, errors } = this.state;

    return (
      <div className={styles.wrapper}>
        <h1>Create new event</h1>
        <div className={styles.container}>
          <div className={styles.section}>
          { errors &&
            Object.values(errors).map((error, index) => {
              if(error)
                return <p key={index} className={styles.error}>{error}</p>;
            })
          }
            <h2 className={styles.section__heading}>Basic information</h2>
            <form className={styles.basic}>
              <div>
                <label htmlFor="name">Event name</label>
                <input placeholder="What's the events name" id="name" type="text" name="name" value={name} onChange={this.handleChange}/>
              </div>
            </form>
          </div>
          <div className={styles.section}>
            <h2 className={styles.section__heading}>Options</h2>
            <form>
              { options.map((option, index) => (
                  <Option key={index} index={index} value={option} onChange={this.handleChangeOption} onDelete={this.deleteOption}/>
                ))
              }
            </form>
            <Button onClick={this.newOption}>New option</Button>
          </div>
          <Button primary onClick={this.submit}>Submit</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(NewEvent);