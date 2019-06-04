import { push } from 'connected-react-router';
import { Observable, interval, of, timer } from 'rxjs';
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
  catchError,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import * as c from './constants';
import * as a from './actions';

export const loadPodsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_PODS),
    mergeMap(({ meta: { url, clusterID, namespaceID, deploymentID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadPodsSuccess(resp, { clusterID, namespaceID, deploymentID })
        ),
        catchError((error) =>
          of(a.loadPodsFailure(error, { clusterID, namespaceID, deploymentID }))
        )
      )
    )
  );

// sts
export const loadSTSPodsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_STS_PODS),
    mergeMap(({ meta: { url, clusterID, namespaceID, statefulSetID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadSTSPodsSuccess(resp, { clusterID, namespaceID, statefulSetID })
        ),
        catchError((error) =>
          of(a.loadSTSPodsFailure(error, { clusterID, namespaceID, statefulSetID }))
        )
      )
    )
  );

// ds
export const loadDSPodsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_DS_PODS),
    mergeMap(({ meta: { url, clusterID, namespaceID, daemonSetID } }) =>
      ajax(url).pipe(
        map((resp) =>
          a.loadDSPodsSuccess(resp, { clusterID, namespaceID, daemonSetID })
        ),
        catchError((error) =>
          of(a.loadDSPodsFailure(error, { clusterID, namespaceID, daemonSetID }))
        )
      )
    )
  );

export default combineEpics(
  loadPodsEpic,
  loadSTSPodsEpic,
  loadDSPodsEpic,
);
