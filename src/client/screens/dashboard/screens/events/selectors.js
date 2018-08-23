import { createSelector } from 'reselect';

const bets = state => state.bets;
const events = state => state.events;

export const eventsSelector = createSelector(
  events,
  bets,
  (events, bets) => Object.values(events.events).map(event => {
    const bet = Object.values(bets.bets).find(bet => bet.event === event.id);
    if(bet)
      return { ...event, userPick: bet.option };
    return { ...event, userPick: null }
  })
)