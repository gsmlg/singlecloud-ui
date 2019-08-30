/*
 * ApplicationStorePage Messages
 *
 * This contains all the text for the ApplicationStorePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ApplicationStorePage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'ApplicationStorePage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of ApplicationStorePage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ApplicationStorePage container!',
  },
  applicationStore: {
    id: `${scope}.applicationStore`,
    defaultMessage: 'ApplicationStore',
  },
  searchApplicationsButton: {
    id: `${scope}.searchApplicationsButton`,
    defaultMessage: 'Search',
  },
  searchFormApplicationName: {
    id: `${scope}.searchFormApplicationName`,
    defaultMessage: 'ApplicationName',
  },
  viewDetailButton: {
    id: `${scope}.viewDetailButton`,
    defaultMessage: 'detailed',
  },
});
