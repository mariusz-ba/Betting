import Event from './events.model';

class EventsService {
  constructor(Event) {
    this.Event = Event;
  }

  async getEvents(query = {}, filter = {}) {
    // For each event calculate total amount of money
    // placed on each option
    return this.Event.find(query, null, filter);
  }

  async getEventById(eventId) {
    // Calculate amount of mony placed on each option
    return this.Event.findOne({ _id: eventId });

    // Populate pool property for each option. If there
    // are no bets for particular option return 0.
    // {
    //   ...
    //   options: [
    //     {
    //       _id: 1,
    //       name: 'Team 1',
    //       pool: 100
    //     },
    //     {
    //       _id: 2,
    //       name: 'Team 2',
    //       pool: 150
    //     }
    //   ]
    // },
    // ...
  }

  async saveEvent(event) {
    await event.save();
    return event;
  }
}

export default new EventsService(Event);