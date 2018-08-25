import React from 'react';
import styles from './options.scss';

import Option from './components/option/option';

const Options = ({ children }) => {
  const options = children.filter(child => child.type === Option);

  return (
    <div className={styles.options}>
      { options[0] }
      <div className={styles.separator}>
        <p>VS</p>
      </div>
      { options[1] }
    </div>
  )
}

export default Options;