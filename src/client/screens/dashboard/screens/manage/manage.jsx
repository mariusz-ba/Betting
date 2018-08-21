import React from 'react';
import { Link } from 'react-router-dom';

export default function Manage(props) {
  return (
    <div>
      <h1>My Events <Link to="/manage/new">New Event</Link></h1>
    </div>
  )
}