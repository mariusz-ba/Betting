import { createSelector } from 'reselect';

const users = state => state.users;
const session = state => state.session;

export const userIdSelector = createSelector(
  session,
  session => session.user._id
)

export const userSelector = createSelector(
  users,
  userIdSelector,
  (users, id) => users.users[id]
)

export const walletSelector = createSelector(
  userSelector,
  user => user && user.wallet
)