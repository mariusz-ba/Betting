import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as SessionActions } from '@services/session';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import styles from './navbar.scss';

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
              <span className={styles.wallet__coins}>$ 153.12</span>
            </div>
            <ul className={styles.submenu}>
              <li className={styles.submenu__item}><Link to="/wallet">Withdraw</Link></li>
              <li className={styles.submenu__item}><Link to="/wallet">Refill</Link></li>
            </ul>
          </li>
          <li ref={node => { this.profileRef = node }} className={profileStyle} onClick={this.toggleProfile}>
            <div className={styles.avatar}>
              <i className="fas fa-user"></i>
            </div>
            <ul className={styles.submenu}>
              <li className={styles.submenu__item}><Link to="/manage">My events</Link></li>
              <li className={styles.submenu__item}><Link to="/settings">Settings</Link></li>
              <li className={styles.submenu__item}><Link to="#" onClick={this.props.signout}>Sign out</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(null, {
  signout: SessionActions.signout
})(Navbar);