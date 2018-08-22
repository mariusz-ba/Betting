import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from '../../store';
import styles from './modal.scss';

import Content from './components/content/content';
import Footer from './components/footer/footer';
import Header from './components/header/header';

import Input from './components/input/input';

export default class Modal extends Component {
  static Content = Content;
  static Header = Header;
  static Footer = Footer;

  static Input = Input;

  static propTypes = {
    onDismiss: PropTypes.func.isRequired
  }

  componentDidMount() {
    //this.modalRef = React.createRef();
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    document.body.appendChild(this.modalTarget);
    document.addEventListener('mousedown', this.handleClickOutside);
    this._render();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  componentWillUpdate() {
    this._render();
  }

  handleClickOutside = e => {
    if(this.modalRef && !this.modalRef.contains(e.target))
      this.props.onDismiss();
  }

  _render() {
    ReactDOM.render(
      <Provider store={store}>
        <div className={styles['click-catcher']}>
          <div ref={node => { this.modalRef = node }} className={styles.modal}>{this.props.children}</div>
        </div>
      </Provider>,
      this.modalTarget
    )
  }

  render() {
    return <noscript/>
  }
}