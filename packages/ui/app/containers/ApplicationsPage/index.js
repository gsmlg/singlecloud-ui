/**
 *
 * ApplicationsPage
 *
 */

import React from 'react';
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
import Button from '@material-ui/core/Button';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { makeSelectURL,makeSelectDeleteApplicationError } from 'ducks/applications/selectors';
import * as actions from 'ducks/applications/actions';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo';

import messages from './messages';
import styles from './styles';
import ApplicationsList from './ApplicationsList';
import ApplicationsPageHelmet from './helmet';
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

/* eslint-disable react/prefer-stateless-function */
export class ApplicationsPage extends React.PureComponent {
  state = {
    filter: {},
  };

  componentDidMount() {
    this.load();
    this.timer = setInterval(() => this.load(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  load() {
    const { loadApplications, url, clusterID, namespaceID } = this.props;
    loadApplications({url, clusterID, namespaceID});
  }

  render() {
    const { classes, submitForm, deleteError, clearDeleteErrorInfo } = this.props;
    const doSubmit = (formValues) => {
      this.setState({
        filter: formValues.toJS(),
      });
    };

    return (
      <div className={classes.root}>
        <ApplicationsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                name: <FormattedMessage {...messages.pageTitle} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            {deleteError ? (
              <ErrorInfo 
                errorText = {deleteError}
                close = {clearDeleteErrorInfo}
              />
            ):null}
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
                        style={{ marginTop: '10px'}}
                      >
                        <FormattedMessage {...messages.searchApplicationsButton} />
                      </Button>
                    </GridItem>
                  </GridContainer>
                  <ApplicationsList filter={this.state.filter}/>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  url: makeSelectURL(),
  deleteError: makeSelectDeleteApplicationError(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(ApplicationsPage);