/*
 * EventsPage Messages
 *
 * This contains all the text for the EventsPage container.
 */

import { defineMessages } from 'react-intl';

import tableSchema from './tableSchema';

export const scope = 'app.containers.EventsPage';

// eslint-disable-next-line
const table = tableSchema.reduce(
  (schema, col) => ({
    [`tableTitle${col.label}`]: {
      id: `${scope}.tableTitle${col.label}`,
      defaultMessage: col.label,
    },
    ...schema,
  }),
  {}
);

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the EventsPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the EventsPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the EventsPage header!',
  },
  events: {
    id: `${scope}.events`,
    defaultMessage: 'Events',
  },
});
