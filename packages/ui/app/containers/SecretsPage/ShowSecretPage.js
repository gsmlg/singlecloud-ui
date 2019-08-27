/**
 *
 * ShowSecretPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/github';
import 'brace/theme/tomorrow_night';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import * as actions from 'ducks/secrets/actions';
import {
  makeSelectCurrentSecret,
  makeSelectURL,
} from 'ducks/secrets/selectors';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import SecretsPageHelmet from './helmet';
import styles from './styles';
/* eslint-disable react/prefer-stateless-function */
export class ShowSecret extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { clusterID, namespaceID, url, loadSecrets } = this.props;
    loadSecrets({ url, clusterID, namespaceID });
  }

  render() {
    const { classes, clusterID, namespaceID, secret } = this.props;

    return (
      <div className={classes.root}>
        <SecretsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/namespaces/${namespaceID}/secrets`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                path: '#',
                name: <FormattedMessage {...messages.showSecret} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.showSecret} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.formName} />}
                        value={secret.get('name')}
                        formControlProps={{
                          className: classes.nameControl,
                        }}
                        fullWidth
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      {secret.get('data') &&
                        secret.get('data').map((sec, idx) => (
                          <GridContainer key={`${idx}-${sec.get('key')}`}>
                            <GridItem xs={3} sm={3} md={3}>
                              <ReadOnlyInput
                                labelText={
                                  <FormattedMessage {...messages.formDataKey} />
                                }
                                value={sec.get('key')}
                                fullWidth
                                formControlProps={{
                                  className: classes.nameControl,
                                }}
                              />
                            </GridItem>
                            <GridItem xs={3} sm={3} md={3}>
                              <ReadOnlyInput
                                labelText={
                                  <FormattedMessage
                                    {...messages.formDataValue}
                                  />
                                }
                                value={sec.get('value')}
                                fullWidth
                                formControlProps={{
                                  className: classes.nameControl,
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                        ))}
                    </GridItem>
                  </GridContainer>
                </CardBody>
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
  secret: makeSelectCurrentSecret(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
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
)(ShowSecret);
