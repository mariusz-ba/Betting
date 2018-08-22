import get from 'lodash/get';

export class Event {
  static counter = 0;

  constructor(data) {
    const id = get(data, 'id', counter++);
    const name = get(data, 'name', 'unnamed');
    const organiser = get(data, 'organiser', 0);
    const createdAt = get(data, 'createdAt', Date.now());
    const updatedAt = get(data, 'updatedAt', Date.now());
    const options = get(data, 'options', []);
    const result = get(data, 'result', {});

    this.id = id;
    this.name = name;
    this.organiser = organiser;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.options = options;
    this.result = result;
  }
}