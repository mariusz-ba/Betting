import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h1>Landing page</h1>
      <Link to="/signin">Sign in</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  )
}