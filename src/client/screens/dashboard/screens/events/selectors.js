import { createSelector } from 'reselect';
import { calculateOdds } from '@services/events/events.utils';

const bets = state => state.bets;
const events = state => state.events;

export const eventsSelector = createSelector(
  events,
  bets,
  (events, bets) => Object.values(events.events)
    .map(event => {
      const bet = Object.values(bets.bets).find(bet => bet.event === event.id);
      const odds = calculateOdds(event.options);

      const eventWithOdds = {
        ...event,
        options: odds
      }

      if(bet)
        return { ...eventWithOdds, userPick: bet.option };
      return { ...eventWithOdds, userPick: null }
    })
    .sort((lhs, rhs) => lhs.createdAt < rhs.createdAt)
)

export const userSelector = createSelector(
  state => state.session,
  session => session.user._id
)