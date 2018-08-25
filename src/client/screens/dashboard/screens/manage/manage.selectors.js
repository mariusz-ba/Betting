import { createSelector } from 'reselect';
import { calculateOdds } from '@services/events/events.utils';

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
    .map(event => ({ ...event, options: calculateOdds(event.options)}))
    .sort((lhs, rhs) => lhs.createdAt < rhs.createdAt)
)