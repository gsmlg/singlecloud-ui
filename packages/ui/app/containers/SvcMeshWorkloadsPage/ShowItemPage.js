/**
 *
 * SvcMeshWorkloadDetailPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectCurrent,
  makeSelectCurrentID,
  makeSelectURL,
} from 'ducks/svcMeshWorkloads/selectors';
import * as actions from 'ducks/svcMeshWorkloads/actions';

import useStyles from './styles';
import messages from './messages';
import Table from './ItemTable';
import Charts from './charts/index';

const SvcMeshWorkloadDetailPage = ({
  clusterID,
  namespaceID,
  location,
  url,
  id,
  readSvcMeshWorkload,
  current,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url && id) {
      readSvcMeshWorkload(id, {
        clusterID,
        namespaceID,
        url: `${url}/${id}`,
      });
    }
    const t = setInterval(() => {
      if (url && id) {
        readSvcMeshWorkload(id, {
          clusterID,
          namespaceID,
          url: `${url}/${id}`,
        });
      }
    }, 3000);

    return () => {
      clearInterval(t);
    };
  }, [clusterID, readSvcMeshWorkload, namespaceID, url, id]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/svcMeshWorkloads`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.svcMeshWorkloadDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            {current.size > 0 ? (
              <h4 className={classes.h4}>
                {current.get('type')} / {current.get('id')}
              </h4>
            ) : null}
            <Charts />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.inboundCardTitle} />
                </h4>
              </CardHeader>
              <CardBody>
                <Table parentType="inbound" />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.outboundCardTitle} />
                </h4>
              </CardHeader>
              <CardBody>
                <Table parentType="outbound" />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.podsCardTitle} />
                </h4>
              </CardHeader>
              <CardBody>
                <Table parentType="pods" />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.TCPCardTitle} />
                </h4>
              </CardHeader>
              <CardBody>
                <Table parentType="tcp" />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  url: makeSelectURL(),
  id: makeSelectCurrentID(),
  current: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SvcMeshWorkloadDetailPage);
