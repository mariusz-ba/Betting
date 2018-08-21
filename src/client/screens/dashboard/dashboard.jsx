import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './dashboard.scss';

import Events from './screens/events/events';
import Bets from './screens/bets/bets';
import Manage from './screens/manage/manage';
import NewEvent from './screens/manage/screens/new-event/new-event';
import Settings from './screens/settings/settings';
import Wallet from './screens/wallet/wallet';

import Navbar from './components/navbar/navbar';
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
        <Navbar onMenuToggle={this.toggle}/>
        <div className={styles.wrapper}>
          <Sidebar open={this.state.sidebarOpen}/>
          <div className={styles.content}>
            <Switch>
              <Route exact path="/" component={Events}/>
              <Route path="/bets" component={Bets}/>
              <Route path="/manage/new" component={NewEvent}/>
              <Route path="/manage" component={Manage}/>
              <Route path="/wallet" component={Wallet}/>
              <Route path="/settings" component={Settings}/>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}