import get from 'lodash/get';

export class User {
  static counter = 0;

  constructor(data) {
    const id = get(data, 'id', User.counter++);
    const username = get(data, 'username', 'unnamed');
    const email = get(data, 'email', 'no email');
    const wallet = get(data, 'wallet', undefined);

    this.id = id;
    this.username = this._getUsername(username);
    this.email = this._getEmail(email);
    this.wallet = this._getWallet(wallet);
  }

  _getUsername(value) {
    return typeof value === 'string' ? value : 'unnamed';
  }

  _getEmail(value) {
    return typeof value === 'string' ? value : 'no email';
  }

  _getWallet(value) {
    return typeof value === 'number' ? value : 0;
  }
}