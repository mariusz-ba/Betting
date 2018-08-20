import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './dashboard.scss';

import Games from './screens/games/games';
import Overview from './screens/overview/overview';
import Settings from './screens/settings/settings';

import Sidebar from './components/sidebar/sidebar';

export default class Dashboard extends Component {
  state = {
    sidebarOpen: false
  }

  toggle = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.navbar}> <button onClick={this.toggle}>Toggle</button></div>
        <div className={styles.wrapper}>
          <Sidebar open={this.state.sidebarOpen}/>
          <div className={styles.content}>
            <Switch>
              <Route exact path="/" component={Overview}/>
              <Route path="/games" component={Games}/>
              <Route path="/settings" component={Settings}/>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}