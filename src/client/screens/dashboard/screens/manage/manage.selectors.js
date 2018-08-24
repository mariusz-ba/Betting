import { createSelector } from 'reselect';

const session = state => state.session;
const events = state => state.events;

export const userSelector = createSelector(
  session,
  session => session.user._id
)

export const eventsSelector = createSelector(
  userSelector,
  events,
  (user, events) => Object.values(events.events)
    .filter(event => event.organiser === user)
)