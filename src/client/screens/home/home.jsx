import React from 'react';
import { connect } from 'react-redux';

import Landing from '../landing/landing';
import Dashboard from '../dashboard/dashboard';

export function Home(props) {
  if(props.isAuthenticated)
    return <Dashboard/>
  return <Landing/>
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.session.isAuthenticated
  }
}

export default connect(mapStateToProps)(Home);