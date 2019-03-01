/*
 *
 * ClustersPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_CLUSTERS,
  LOAD_CLUSTERS_REQUEST,
  LOAD_CLUSTERS_SUCCESS,
  LOAD_CLUSTERS_FAILURE,
} from './constants';

export function initAction() {
  return {
    type: INIT_ACTION,
  };
}

export const loadClusters = () => ({
  type: LOAD_CLUSTERS,
  payload: {},
});

export const loadClustersRequest = () => ({
  type: LOAD_CLUSTERS_REQUEST,
  payload: {},
});

export const loadClustersSuccess = data => ({
  type: LOAD_CLUSTERS_SUCCESS,
  payload: { data },
});

export const loadClustersFailure = errors => ({
  type: LOAD_CLUSTERS_FAILURE,
  payload: { errors },
});
