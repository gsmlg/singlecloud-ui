/**
 * Duck: UserQuotas
 * epic: userQuotas
 *
 */
import { push } from 'connected-react-router';
import { Observable, interval, of, timer, concat } from 'rxjs';
import {
  mergeMap,
  map,
  mapTo,
  debounce,
  debounceTime,
  reduce,
  scan,
  throttleTime,
  throttle,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import * as c from './constants';
import * as a from './actions';

export const loadUserQuotasEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.LOAD_USER_QUOTAS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadUserQuotasSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.loadUserQuotasFailure(error, meta);
        })
      )
    )
  );

export const createUserQuotaEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.CREATE_USER_QUOTA),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createUserQuotaSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.createUserQuotaFailure(error, meta);
        })
      )
    )
  );

export const updateUserQuotaEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.UPDATE_USER_QUOTA),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateUserQuotaSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.updateUserQuotaFailure(error, meta);
        })
      )
    )
  );

export const readUserQuotaEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.READ_USER_QUOTA),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readUserQuotaSuccess(resp, { ...meta, id: payload });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.readUserQuotaFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export const removeUserQuotaEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.REMOVE_USER_QUOTA),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeUserQuotaSuccess(resp, { ...meta, id: payload });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.removeUserQuotaFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export const executeUserQuotaActionEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.EXECUTE_USER_QUOTA_ACTION),
    mergeMap(({ payload: { action, data }, meta }) =>
      ajax({
        url: `${meta.url}?action=${action}`,
        method: 'POST',
        body: data,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.executeUserQuotaActionSuccess(resp, { ...meta, action });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.executeUserQuotaActionFailure(error, { ...meta, action });
        })
      )
    )
  );

export default combineEpics(
  loadUserQuotasEpic,
  createUserQuotaEpic,
  updateUserQuotaEpic,
  readUserQuotaEpic,
  removeUserQuotaEpic,
  executeUserQuotaActionEpic
);
