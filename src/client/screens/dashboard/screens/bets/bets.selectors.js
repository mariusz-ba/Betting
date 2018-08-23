import { createSelector } from 'reselect';

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

      return { ...bet, options, pick };
    })
)