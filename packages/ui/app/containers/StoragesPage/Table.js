/**
 *
 * Storages Table
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import * as actions from 'ducks/storages/actions';
import {
  makeSelectStorages,
  makeSelectStoragesList,
} from 'ducks/storages/selectors';

import { usePush, useLocation } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

export const StoragesTable = ({
  clusterID,
  data,
  removeStorage,
  setError,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const { pathname } = location;
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: { removeStorage, clusterID, pathname, setError },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { pathname, classes },
        };
      }
      return sch;
    })
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }));

  return (
    <Paper className={classes.tableWrapper}>
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={data}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  data: makeSelectStoragesList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(StoragesTable);
