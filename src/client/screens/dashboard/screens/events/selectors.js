import { createSelector } from 'reselect';

const events = state => state.events;

export const eventsSelector = createSelector(
  events,
  events => Object.values(events.events)
)