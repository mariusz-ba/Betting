import Event from './events.model';

class EventsService {
  constructor(Event) {
    this.Event = Event;
  }

  async getEvents(query = {}, filter = {}) {
    // For each event calculate total amount of money
    // placed on each option
    const params = {};
    if(query.events) params['_id'] = { $in: query.events };
    if(query.organiser) params['organiser'] = query.organiser;

    return this.Event.find(params, null, filter);
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

  async getOptions(eventId) {
    const event = await this.Event.findOne({ _id: eventId });
    return [].concat(event.options);
  }

  async saveEvent(event) {
    await event.save();
    return event;
  }

  async closeEvent(eventId, optionId) {
    return this.Event.findOneAndUpdate(
      { _id: eventId }, 
      { 
        $set: { 
          result: {
            finished: true,
            option: optionId
          }
        }
      },
      { new: true }
    )
  }
}

export default new EventsService(Event);