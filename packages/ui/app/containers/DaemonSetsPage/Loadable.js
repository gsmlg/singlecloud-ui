/**
 *
 * Asynchronously loads the component for DaemonSetsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "DaemonSetsPage" */ './index')
);

export const CreateDaemonSetPage = loadable(() =>
  import(/* webpackChunkName: "CreateDaemonSetPage" */ './CreateDaemonSetPage')
);

export const DaemonSetDetailPage = loadable(() =>
  import(/* webpackChunkName: "DaemonSetDetailPage" */ './DaemonSetDetailPage')
);