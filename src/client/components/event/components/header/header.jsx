import React from 'react';
import styles from './header.scss';

import Actions from './components/actions/actions';
import Title from './components/title/title';
import Time from './components/time/time';

const Header = ({ children }) => {
  const time = children.filter(child => child.type === Time);
  const title = children.filter(child => child.type === Title);
  const actions = children.filter(child => child.type === Actions);
  
  const renderTime = time.length > 0 ? time[0] : <Time>{Date.now()}</Time>
  const renderTitle = title.length > 0 ? title[0] : <Title>Event</Title>
  const renderActions = actions.length > 0 ? actions[0] : <Actions></Actions>

  return (
    <div className={styles.header}>
      { renderTime }
      { renderTitle }
      { renderActions }
    </div>
  )
}

export default Header;