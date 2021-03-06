/**
 *
 * ApplicationStorePage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';
import { SubmissionError, submit } from 'redux-form';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';
import Button from '@material-ui/core/Button';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectURL } from 'ducks/charts/selectors';
import * as actions from 'ducks/charts/actions';

import { useLocation } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import ApplicationsList from './ApplicationsList';
import SearchForm from './form/searchForm';

export const formName = 'searchApplicationsForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const SearchApplicationsForm = reduxForm({
  form: formName,
  validate,
})(SearchForm);

const ApplicationStorePage = ({
  clusterID,
  namespaceID,
  url,
  loadCharts,
  submitForm,
}) => {
  const classes = useStyles();
  const [filter, setFilter] = useState({});
  const location = useLocation();
  const { pathname } = location;

  const reg = new RegExp('^/clusters/[^/]+/namespaces/[^/]+/([^/]+)');
  const [path, res] = reg.exec(pathname) || [];
  let isZcloudChart = false;
  if (res === 'charts') {
    isZcloudChart = true;
  }

  useEffect(() => {
    if (url) {
      loadCharts(`${url}?${isZcloudChart ? 'is_zcloud_chart=true' : 'is_user_chart=true'}`, {
        clusterID,
        namespaceID,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, isZcloudChart, loadCharts, namespaceID, url]);

  const doSubmit = (formValues) => {
    setFilter(formValues.toJS());
  };

  const pageTitle = isZcloudChart ? messages.pageTitle : messages.pageTitleUsers;
  const pageDesc = isZcloudChart ? messages.pageDesc : messages.pageDescUsers;

  return (
    <div className={classes.root}>
      <Helmet title={pageTitle} description={pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/${res}`,
              name: <FormattedMessage {...pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              <GridContainer style={{ marginBottom: '20px' }}>
                <GridItem xs={3} sm={3} md={3}>
                  <SearchApplicationsForm
                    classes={classes}
                    onSubmit={doSubmit}
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    style={{ marginTop: '10px' }}
                  >
                    <FormattedMessage {...messages.searchApplicationsButton} />
                  </Button>
                </GridItem>
              </GridContainer>
              <ApplicationsList filter={filter} res={res} />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ApplicationStorePage);
