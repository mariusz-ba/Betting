import { createSelector } from 'reselect';
import get from 'lodash/get';

const user = state => state.session.user._id;
const users = state => state.users.users;

export const walletSelector = createSelector(
  user,
  users,
  (user, users) => get(users, [user, 'wallet'], 0)
)