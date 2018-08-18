import React, { Component } from 'react';
import axios from 'axios';

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
      <div>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" name="username" value={username} onChange={this.handleChange}/>
            { errors.username &&
              <p>{errors.username}</p>
            }
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input id="email" type="email" name="email" value={email} onChange={this.handleChange}/>
            { errors.email &&
              <p>{errors.email}</p>
            }
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" value={password} onChange={this.handleChange}/>
            { errors.password &&
              <p>{errors.password}</p>
            }
          </div>
          <div>
            <label htmlFor="confirm">Confirm password</label>
            <input id="confirm" type="password" name="confirm" value={confirm} onChange={this.handleChange}/>
            { errors.confirm &&
              <p>{errors.confirm}</p>
            }
          </div>
          <button type="submit" onClick={this.submit}>Sign up</button>
        </form>
      </div>
    )
  }
}