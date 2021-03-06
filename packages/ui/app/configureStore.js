/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { BehaviorSubject, concat, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import getByKey from '@gsmlg/utils/getByKey';

import { httpError } from 'ducks/app/actions';

import createReducer from './reducers';
import createEpic from './epics';

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    ajax: (arg) => {
      let opt = arg;
      if (typeof opt === 'string') {
        opt = {
          url: arg,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      }
      return ajax({
        ...opt,
        body: JSON.stringify(opt && opt.body),
        headers: {
          'Content-Type': 'application/json',
          ...((opt && opt.headers) || {}),
        },
      });
    },
    catchAjaxError: (handler) => (
      catchError((error) => (
        of(httpError(error), handler(error))
      ))
    ),
  },
});

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. epicMiddleware: Makes redux-observable work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [epicMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.runEpic = epicMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedEpics = {}; // Epic registry

  const epic$ = new BehaviorSubject(createEpic(store.injectedEpics));
  // Every time a new epic is given to epic$ it
  // will unsubscribe from the previous one then
  // call and subscribe to the new one because of
  // how switchMap works
  const hotReloadingEpic = (...args) =>
    epic$.pipe(switchMap((epic) => epic(...args)));
  store.runEpic(hotReloadingEpic);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
    module.hot.accept('./epics', () => {
      const nextRootEpic = createEpic(store.injectedEpics);
      epic$.next(nextRootEpic);
    });
  }

  return store;
}
