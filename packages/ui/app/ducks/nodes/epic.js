/**
 * Duck: Nodes
 * epic: nodes
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

export const loadNodesEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.LOAD_NODES),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadNodesSuccess(resp, meta);
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.loadNodesFailure(error, meta);
        })
      )
    )
  );

export const readNodeEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.READ_NODE),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readNodeSuccess(resp, { ...meta, id: payload });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.readNodeFailure(error, { ...meta, id: payload });
        })
      )
    )
  );

export const executeNodeActionEpic = (action$, state$, { ajax, catchAjaxError }) =>
  action$.pipe(
    ofType(c.EXECUTE_NODE_ACTION),
    mergeMap(({ payload: { action, data }, meta }) =>
      ajax({
        url: `${meta.url}?action=${action}`,
        method: 'POST',
        body: data,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.executeNodeActionSuccess(resp, { ...meta, action });
        }),
        catchAjaxError((error) => {
          meta.reject && meta.reject(error);
          return a.executeNodeActionFailure(error, { ...meta, action });
        })
      )
    )
  );

export default combineEpics(
  loadNodesEpic,
  readNodeEpic,
  executeNodeActionEpic,
);
