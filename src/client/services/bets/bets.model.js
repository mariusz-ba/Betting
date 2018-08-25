import get from 'lodash/get';

export class Bet {
  static counter = 0;

  constructor(data) {
    const id = get(data, 'id', Bet.counter++);
    const user = get(data, 'user', '0');
    const event = get(data, 'event', '0');
    const option = get(data, 'option', '0');
    const amount = get(data, 'amount', 0);
    const resolved = get(data, 'resolved', {});
    const won = get(data, 'won', 0);
    const createdAt = get(data, 'createdAt', Date.now);

    this.id = id;
    this.user = this._getUser(user);
    this.event = this._getEvent(event);
    this.option = this._getOption(option);
    this.amount = this._getAmount(amount);
    this.resolved = this._getResolved(resolved, won);
    this.createdAt = this._getCreatedAt(createdAt);
  }

  _getUser(value) {
    return typeof value === 'string' ? value : '0';
  }

  _getEvent(value) {
    return typeof value === 'string' ? value : '0';
  }

  _getOption(value) {
    return typeof value === 'string' ? value : '0';
  }

  _getAmount(value) {
    return typeof value === 'number' ? value : 0;
  }

  _getResolved(value, won) {
    const defaults = {
      resolved: false,
      won: 0,
      option: '0'
    }

    if(typeof value !== 'object')
      return defaults;

    if(typeof won !== 'number')
      return defaults

    return {
      resolved: value.resolved ? value.resolved : false,
      option: value.option ? value.option : '0',
      won
    }
  }

  _getCreatedAt(value) {
    return typeof value === 'number' ? value : Date.now;
  }
}