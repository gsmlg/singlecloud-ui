/**
 * Duck: Blockdevices
 * reducer: blockDevices
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
  data: {},
  list: {},
  selectedData: null,
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_BLOCK_DEVICES:
      return state;
    case c.LOAD_BLOCK_DEVICES_SUCCESS: {
      const { data, list } = procCollectionData(payload, { generateID: true });
      const { clusterID } = meta;
      return state
        .setIn(['data', clusterID], fromJS(data))
        .setIn(['list', clusterID], fromJS(list));
    }
    case c.LOAD_BLOCK_DEVICES_FAILURE:
      return state;

    default:
      return state;
  }
};

export default reducer;