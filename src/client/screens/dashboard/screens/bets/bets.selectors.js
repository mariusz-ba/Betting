import { createSelector } from 'reselect';
import { calculateOdds } from '@services/events/events.utils';

const session = state => state.session;
const events = state => state.events;
const bets = state => state.bets;

export const userSelector = createSelector(
  session,
  session => session.user._id
)

export const betsSelector = createSelector(
  userSelector,
  bets,
  events,
  (user, bets, events) => Object.values(bets.bets)
    .filter(bet => bet.user === user)
    .map(bet => {

      const options = [
        events.events[bet.event] ? events.events[bet.event].options[0].name : 'unnamed',
        events.events[bet.event] ? events.events[bet.event].options[1].name : 'unnamed'
      ]

      const pick = events.events[bet.event] ? 
        events.events[bet.event].options.find(option => option.id === bet.option).name : 'unnamed';

      const odds = events.events[bet.event] ?
        calculateOdds(events.events[bet.event].options) : undefined;

      const potentialReward = odds ? (odds.find(option => option.id === bet.option).multiplier * bet.amount - bet.amount).toFixed(2) : 0;

      return { ...bet, options, pick, potentialReward };
    })
    .sort((lhs, rhs) => lhs.createdAt > rhs.createdAt)
)