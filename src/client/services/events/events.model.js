import get from 'lodash/get';

export class Event {
  static counter = 0;

  constructor(data) {
    const id = get(data, 'id', `${Event.counter++}`);
    const name = get(data, 'name', 'unnamed');
    const organiser = get(data, 'organiser', '0');
    const createdAt = get(data, 'createdAt', Date.now());
    const updatedAt = get(data, 'updatedAt', Date.now());
    const options = get(data, 'options', []);
    const result = get(data, 'result', {});

    this.id = id;
    this.name = this._getName(name);
    this.organiser = this._getOrganiser(organiser);
    this.createdAt = this._getCreatedAt(createdAt);
    this.updatedAt = this._getUpdatedAt(updatedAt);
    this.options = this._getOptions(options);
    this.result = this._getResult(result);
  }

  _getName(value) {
    if(typeof value !== 'string')
      return 'unnamed';
    return value;
  }

  _getOrganiser(value) {
    if(typeof value !== 'string')
      return '0'
    return value;
  }

  _getCreatedAt(value) {
    return typeof value === 'number' ? value : Date.now();
  }

  _getUpdatedAt(value) {
    return typeof value === 'number' ? value : Date.now();
  }

  _getOptions(value) {
    const defaults = [
      { id: '0', name: 'unnamed', pool: 0 },
      { id: '1', name: 'unnamed', pool: 0 }
    ]

    if(!Array.isArray(value) || value.length < 2)
      return defaults;
    
    return value.map(item => {
      if(!item)
        return defaults[0];
        
      return {
        id: item._id ? item._id : '0',
        name: item.name ? item.name : 'unnamed',
        pool: item.pool ? item.pool : 0
      }
    })
  }

  _getResult(value) {
    const defaults = {
      finished: false,
      option: '0'
    }

    if(typeof value !== 'object')
      return defaults;
    
    return {
      finished: value.finished ? value.finished : false,
      option: value.option ? value.option : '0'
    }
  }
}