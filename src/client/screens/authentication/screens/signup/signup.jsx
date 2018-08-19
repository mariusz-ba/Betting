import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../authentication.scss';

import Button from '@components/button/button';
import Card from '../../components/card/card';
import Form from '../../components/form/form';

export default class SignUp extends Component {
  state = {
    username: '',
    password: '',
    confirm: '',
    email: '',
    errors: {}
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  }

  submit = async e => {
    e.preventDefault();
    if(!this.validate()) {
      this.setState({ errors: { confirm: 'Password does not match' }})
      return;
    }

    this.setState({ errors: {} });

    try {
      await axios.post('/api/users', {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
      // No errors means user has been created
      // sign in and redirect
      console.log('Successfully created new user');
    } catch(error) {
      this.setState({ errors: error.response.data.fields })
    }
  }

  validate() {
    return this.state.password === this.state.confirm;
  }

  render() {
    const { username, email, password, confirm } = this.state;
    const { errors } = this.state;

    return (
      <div className={styles.container}>
        <Card>
          <Card.Header>Sign up</Card.Header>
          <Card.Content>
            <Form>
              <Form.Group error={errors.username}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" name="username" value={username} onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group error={errors.email}>
                <label htmlFor="email">E-Mail</label>
                <input id="email" type="email" name="email" value={email} onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group error={errors.password}>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" value={password} onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group error={errors.confirm}>
                <label htmlFor="confirm">Confirm password</label>
                <input id="confirm" type="password" name="confirm" value={confirm} onChange={this.handleChange}/>
              </Form.Group>
              <Button primary onClick={this.submit}>Sign up</Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    )
  }
}