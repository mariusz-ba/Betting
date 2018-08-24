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
    .map(event => ({ ...event, options: odds(event.options)}))
)

// Returns new options array with multiplier prop
// for each option
function odds(options) {
  // options = [{name: ..., pool: ...}]
  const totalPool = options.reduce((acc, option) => acc + option.pool, 0);
  return options.map(option => {
    if(totalPool === 0 || option.pool === 0)
      return {
        ...option,
        multiplier: 1,
        odds: 0
      }
    
    return {
      ...option,
      multiplier: totalPool / option.pool,
      odds: (option.pool / totalPool * 100).toFixed(2)
    }
  })
}
