import { createSelector } from 'reselect';
import { prefix } from './constants';

/**
 * Direct selector to the loginPage state domain
 */

const selectRoleDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectRole = () =>
  createSelector(
    selectRoleDomain,
    (substate) => substate.get('role')
  );

export const makeSelectToken = () =>
  createSelector(
    selectRoleDomain,
    (substate) => substate.get('token')
  );

export const makeSelectJWT = () =>
  createSelector(
    selectRoleDomain,
    (substate) => substate.get('jwt')
  );

export const makeSelectAuthorization = () =>
  createSelector(
    selectRoleDomain,
    (substate) => `Bearer ${substate.get('token')}`
  );

export const makeSelectIsLogin = () =>
  createSelector(
    selectRoleDomain,
    (substate) => {
      const jwt = substate.get('jwt');
      return !!jwt;
    }
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectRoleDomain = () =>
  createSelector(
    selectRoleDomain,
    (substate) => substate
  );

export default makeSelectRoleDomain;
