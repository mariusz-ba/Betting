import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as SessionActions } from '@services/session';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import styles from './navbar.scss';
import { walletSelector } from './navbar.selector';

export class Navbar extends Component {
  state = {
    walletOpen: false,
    profileOpen: false
  }
  
  static propTypes = {
    onMenuToggle: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    // Set submenus max height
    this.submenu1.style.setProperty('--max-height', this.submenu1.scrollHeight + 'px');
    this.submenu2.style.setProperty('--max-height', this.submenu2.scrollHeight + 'px');
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if(this.walletRef && !this.walletRef.contains(e.target))
      this.setState({ walletOpen: false });
    if(this.profileRef && !this.profileRef.contains(e.target))
      this.setState({ profileOpen: false });
  }

  toggleWallet = e => {
    this.setState({ walletOpen: !this.state.walletOpen });
  }

  toggleProfile = e => {
    this.setState({ profileOpen: !this.state.profileOpen })
  }

  render() {
    const walletStyle = classnames(styles.navbar__item, {
      [styles['navbar__item--open']]: this.state.walletOpen
    })

    const profileStyle = classnames(styles.navbar__item, {
      [styles['navbar__item--open']]: this.state.profileOpen
    })

    return (
      <div className={styles.navbar}>
        <button className={styles.toggler} onClick={this.props.onMenuToggle}>
          <i className="fas fa-bars"></i>
        </button>
        <ul className={styles.navbar__menu}>
          <li ref={node => { this.walletRef = node }} className={walletStyle} onClick={this.toggleWallet}>
            <div className={styles.wallet}>
              <span className={styles.wallet__title}>Coins</span>
              <span className={styles.wallet__coins}>$ {this.props.wallet.toFixed(2)}</span>
            </div>
            <ul className={styles.submenu} ref={node => { this.submenu1 = node }}>
              <li className={styles.submenu__item}><Link to="/wallet">Withdraw</Link></li>
              <li className={styles.submenu__item}><Link to="/wallet">Refill</Link></li>
            </ul>
          </li>
          <li ref={node => { this.profileRef = node }} className={profileStyle} onClick={this.toggleProfile}>
            <div className={styles.avatar}>
              <i className="fas fa-user"></i>
            </div>
            <ul className={styles.submenu} ref={node => { this.submenu2 = node }}>
              <li className={styles.submenu__item}><Link to="/manage">My events</Link></li>
              <li className={styles.submenu__item}><Link to="/bets">My bets</Link></li>
              <li className={styles.submenu__item}><Link to="/settings">Settings</Link></li>
              <li className={styles.submenu__item}><Link to="#" onClick={this.props.signout}>Sign out</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    wallet: walletSelector(state)
  }
}

export default connect(
  mapStateToProps, 
  {
    signout: SessionActions.signout
  }
)(Navbar);