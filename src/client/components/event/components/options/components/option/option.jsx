import React from 'react';
import classnames from 'classnames';
import styles from './option.scss';

const Option = ({ 
  name, multiplier, odds, onClick,
  left, right, pick, winner, disabled
}) => {
  const optionClass = classnames(styles.option, {
    [styles['option--left']]: left,
    [styles['option--right']]: right,
    [styles['option--disabled']]: disabled
  })

  const innerOptionClass = classnames(styles.inner, {
    [styles['inner--pick']]: pick,
    [styles['inner--winner']]: winner,
  })

  return (
    <div className={optionClass}>
      <div className={styles.odds}>{odds}%</div>
      <div className={innerOptionClass} onClick={onClick}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.multiplier}>x{multiplier.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default Option;