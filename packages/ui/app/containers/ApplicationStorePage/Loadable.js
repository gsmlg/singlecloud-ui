/**
 *
 * Asynchronously loads the component for ApplicationStorePage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ApplicationStorePage" */ './index')
);

export const CreateApplicationPage = loadable(() =>
  import(/* webpackChunkName: "CreateApplicationPage" */ './CreateApplicationPage')
);
