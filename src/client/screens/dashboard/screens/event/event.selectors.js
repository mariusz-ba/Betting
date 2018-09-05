import { createSelector } from 'reselect';
import { calculateOdds } from '@services/events/events.utils';
import { Event } from '@services/events/events.model';
import get from 'lodash/get';

const getId = (state, props) => props.match.params.id;
const events = state => state.events.events;
const bets = state => state.bets.bets;

export const makeGetEvent = () => createSelector(
  getId,
  events,
  bets,
  (id, events, bets) => {
    const event = get(events, id, new Event(null));
    const bet = Object.values(bets).find(bet => bet.event === id);
    const odds = calculateOdds(event.options);

    const eventWithOdds = {
      ...event,
      options: odds
    }

    if(bet)
      return { ...eventWithOdds, userPick: bet.option };
    return { ...eventWithOdds, userPick: null };
  }
)