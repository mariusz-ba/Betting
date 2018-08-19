import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '@services/session/session.actions';
import get from 'lodash/get';
import styles from '../../authentication.scss';

import Button from '@components/button/button';
import Card from '../../components/card/card';
import Form from '../../components/form/form';

export class SignIn extends Component {
  state = {
    identifier: '',
    password: ''
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  }

  submit = async e => {
    e.preventDefault();
    try {
      await this.props.signin({
        identifier: this.state.identifier,
        password: this.state.password
      });
      // Valid credentials redirect to home
      this.props.history.push('/');
    } catch (e) {
      // Invalid credentials, do nothing
    }
  }

  render() { 
    const { identifier, password } = this.state;
    const { errors } = this.props.session;

    return (
      <div className={styles.container}>
        <Card>
          <Card.Header>Sign in</Card.Header>
          <Card.Content>
            <Form>
              <Form.Group error={get(errors, 'identifier', undefined)}>
                <label htmlFor="identifier">Username or E-Mail</label>
                <input id="identifier" type="text" name="identifier" value={identifier} onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group error={get(errors, 'password', undefined)}>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" value={password} onChange={this.handleChange}/>
              </Form.Group>
              <Button primary onClick={this.submit}>Sign up</Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

export default withRouter(connect(mapStateToProps, { signin })(SignIn));