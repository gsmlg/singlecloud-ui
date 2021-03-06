/**
 * Duck: ConfigMaps
 * epic: configMaps
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

export const loadConfigMapsEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.LOAD_CONFIG_MAPS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadConfigMapsSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.loadConfigMapsFailure(error, meta);
        })
      )
    )
  );

export const createConfigMapEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.CREATE_CONFIG_MAP),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.createConfigMapSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.createConfigMapFailure(error, meta);
        })
      )
    )
  );

export const updateConfigMapEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.UPDATE_CONFIG_MAP),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.updateConfigMapSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.updateConfigMapFailure(error, meta);
        })
      )
    )
  );

export const readConfigMapEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.READ_CONFIG_MAP),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readConfigMapSuccess(resp, { ...meta, id: payload });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.readConfigMapFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export const removeConfigMapEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.REMOVE_CONFIG_MAP),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.removeConfigMapSuccess(resp, { ...meta, id: payload });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.removeConfigMapFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export default combineEpics(
  loadConfigMapsEpic,
  createConfigMapEpic,
  updateConfigMapEpic,
  readConfigMapEpic,
  removeConfigMapEpic,
);
