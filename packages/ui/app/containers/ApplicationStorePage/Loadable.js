/**
 *
 * Asynchronously loads the component for ApplicationStorePage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "ApplicationStorePage" */ './index')
);

export const UsersApplicationStorePage = loadable(() =>
  import(/* webpackChunkName: "ApplicationStorePage" */ './index')
);
