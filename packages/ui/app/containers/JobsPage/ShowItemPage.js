/**
 *
 * JobDetailPage
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from 'ducks/jobs/selectors';
import * as podsActions from 'ducks/pods/actions';
import * as actions from 'ducks/jobs/actions';
import PodsTable from 'containers/PodsPage/PodsTable';

import Item from './Item';
import messages from './messages';
import useStyles from './styles';

export const JobDetailPage = ({
  clusterID,
  namespaceID,
  jobID,
  job,
  url,
  loadJOBPods: loadPods,
  readJob,
}) => {
  const classes = useStyles();
  const podUrl = job.getIn(['links', 'pods']);
  useEffect(() => {
    const loadJobAndPods = () => {
      readJob(jobID, {
        clusterID,
        namespaceID,
        url: `${url}/${jobID}`,
      });
      if (podUrl) {
        loadPods(podUrl, { clusterID, namespaceID, jobID });
      }
    };
    loadJobAndPods();
    const timer = setInterval(loadJobAndPods, 3000);

    return () => clearInterval(timer);
  }, [url, podUrl, readJob, jobID, clusterID, namespaceID, loadPods]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/jobs`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.jobDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <Item job={job} />
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.pods} />
                </h4>
              </CardHeader>
              <CardBody>
                <PodsTable parentType="job" />
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
  jobID: makeSelectCurrentID(),
  url: makeSelectURL(),
  job: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...podsActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(JobDetailPage);
