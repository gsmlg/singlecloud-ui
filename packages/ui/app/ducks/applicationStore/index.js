/**
 *
 * Charts Duck
 *
 */
import _ from 'lodash';
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

export const initialState = fromJS({
  charts: {},
  list: [],
  selectedChart: {},
  deleteError:"",
});

const c = constants;

export const chartsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_CHARTS:
      return state;
    case c.LOAD_CHARTS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      return state.set('charts', fromJS(data)).set('list', fromJS(list));
    }
    case c.LOAD_CHARTS_FAILURE:
      return state;

    case c.CHANGE_CHART:
      return state.setIn(['selectedChart'], payload.chartID);

    default:
      return state;
  }
};

export default chartsReducer;