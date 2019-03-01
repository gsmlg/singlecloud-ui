import { takeLatest, call, put, select, delay } from 'redux-saga/effects';
import request from 'utils/request';

import { INIT_ACTION, LOAD_CLUSTERS } from './constants';
import {
  loadClustersRequest,
  loadClustersSuccess,
  loadClustersFailure,
} from './actions';
import { makeSelectClusters } from './selectors';

const url = '/zcloud.cn/v1/clusters';

export function* initialize() {
  yield* loadClusters();
  while (true) {
    yield delay(3000);
    const clusters = yield select(makeSelectClusters());
    if (clusters.size > 0) break;
    yield* loadClusters();
  }
}

export function* loadClusters() {
  try {
    yield put(loadClustersRequest());
    const data = yield call(request, url);
    yield put(loadClustersSuccess(data));
  } catch (e) {
    yield put(loadClustersFailure(e));
  }
}

// Individual exports for testing
export default function* clustersPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT_ACTION, initialize);
  yield takeLatest(LOAD_CLUSTERS, loadClusters);
}
